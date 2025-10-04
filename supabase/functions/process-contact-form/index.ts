import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    const formData: ContactFormData = await req.json();

    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'All fields are required' 
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Please enter a valid email address' 
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error: dbError } = await supabase
      .from('client_inquiries')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save inquiry to database');
    }

    console.log('Inquiry saved to database:', data);

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ff66c4 0%, #ff4da6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin: 0 0 15px 0;">Contact Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #ff66c4;">${formData.email}</a></p>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin: 0 0 15px 0;">Message</h3>
              <p style="color: #333; line-height: 1.6; margin: 0;">${formData.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p style="color: #666; font-size: 12px; text-align: center; margin: 20px 0 0 0;">
              Submitted on ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `;

      const emailPayload = {
        from: 'ShiftORL <info@shiftorl.site>',
        to: ['info@shiftorl.site'],
        subject: `New Contact: ${formData.name}`,
        html: emailHtml,
        reply_to: formData.email
      };

      console.log('Sending contact form email...');
      console.log('From:', emailPayload.from);
      console.log('To:', emailPayload.to);

      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });

        const responseText = await emailResponse.text();
        console.log('Resend API response status:', emailResponse.status);
        console.log('Resend API response body:', responseText);

        if (emailResponse.ok) {
          const emailResult = JSON.parse(responseText);
          console.log('Email sent successfully! ID:', emailResult.id);
        } else {
          console.error('Email sending failed - Status:', emailResponse.status);
          console.error('Email sending failed - Body:', responseText);
        }
      } catch (emailError) {
        console.error('Email error:', emailError);
        console.error('Email error stack:', emailError.stack);
      }
    } else {
      console.warn('RESEND_API_KEY not configured, skipping email');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your inquiry! We will get back to you within 3 business days.',
        data: data
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to process your inquiry. Please try again or contact info@shiftorl.site',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
