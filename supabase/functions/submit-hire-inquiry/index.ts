const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface HireInquiryData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry?: string;
  companySize?: string;
  positionTitle?: string;
  positionLevel?: string;
  timeline?: string;
  budget?: string;
  requirements?: string;
  benefits?: string;
  message?: string;
  delegation1?: string;
  delegation2?: string;
  delegation3?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }), 
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const inquiryData: HireInquiryData = await req.json();

    if (!inquiryData.companyName || !inquiryData.contactName || !inquiryData.email || !inquiryData.phone) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields. Please fill in company name, contact name, email, and phone.' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!inquiryData.delegation1 || !inquiryData.delegation2 || !inquiryData.delegation3) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Please fill in all three delegation opportunities.' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inquiryData.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Please enter a valid email address.' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #ff66c4 0%, #ff4da6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Hiring Inquiry</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">ShiftORL Client Portal</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Company Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company Name:</td><td style="padding: 8px 0; color: #333;">${inquiryData.companyName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Contact Name:</td><td style="padding: 8px 0; color: #333;">${inquiryData.contactName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #333;"><a href="mailto:${inquiryData.email}" style="color: #ff66c4; text-decoration: none;">${inquiryData.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #333;">${inquiryData.phone}</td></tr>
              ${inquiryData.industry ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Industry:</td><td style="padding: 8px 0; color: #333;">${inquiryData.industry}</td></tr>` : ''}
              ${inquiryData.companySize ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company Size:</td><td style="padding: 8px 0; color: #333;">${inquiryData.companySize}</td></tr>` : ''}
            </table>
          </div>

          ${inquiryData.positionTitle || inquiryData.positionLevel || inquiryData.timeline || inquiryData.budget ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Position Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${inquiryData.positionTitle ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Position Title:</td><td style="padding: 8px 0; color: #333;">${inquiryData.positionTitle}</td></tr>` : ''}
              ${inquiryData.positionLevel ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Position Level:</td><td style="padding: 8px 0; color: #333;">${inquiryData.positionLevel}</td></tr>` : ''}
              ${inquiryData.timeline ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Timeline:</td><td style="padding: 8px 0; color: #333;">${inquiryData.timeline}</td></tr>` : ''}
              ${inquiryData.budget ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Budget Range:</td><td style="padding: 8px 0; color: #333;">${inquiryData.budget}</td></tr>` : ''}
            </table>
          </div>
          ` : ''}

          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Delegation Opportunities</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #ff66c4;">
              <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.6;">
                <li style="margin-bottom: 8px;"><strong>Responsibility 1:</strong> ${inquiryData.delegation1}</li>
                <li style="margin-bottom: 8px;"><strong>Responsibility 2:</strong> ${inquiryData.delegation2}</li>
                <li style="margin-bottom: 0;"><strong>Responsibility 3:</strong> ${inquiryData.delegation3}</li>
              </ul>
            </div>
          </div>

          ${inquiryData.requirements ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Key Requirements & Skills</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #ff66c4;">
              <p style="margin: 0; color: #333; line-height: 1.6;">${inquiryData.requirements.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          ` : ''}

          ${inquiryData.benefits ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Benefits & Perks</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #ff66c4;">
              <p style="margin: 0; color: #333; line-height: 1.6;">${inquiryData.benefits.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          ` : ''}

          ${inquiryData.message ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Additional Information</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #ff66c4;">
              <p style="margin: 0; color: #333; line-height: 1.6;">${inquiryData.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          ` : ''}

          <div style="text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 30px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Submitted on ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p style="color: #ff66c4; font-size: 14px; margin: 10px 0 0 0; font-weight: bold;">
              ShiftORL Recruiting Platform
            </p>
          </div>
        </div>
      </div>
    `;

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    console.log('=== RESEND API KEY CHECK ===');
    console.log('API Key exists:', !!resendApiKey);
    console.log('API Key length:', resendApiKey ? resendApiKey.length : 0);
    console.log('API Key starts with re_:', resendApiKey ? resendApiKey.startsWith('re_') : false);
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service not configured. Please contact support at hire@shiftorl.site' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailPayload = {
      from: 'ShiftORL <info@shiftorl.site>',
      to: ['hire@shiftorl.site'],
      subject: `New Hiring Inquiry: ${inquiryData.companyName} - ${inquiryData.positionTitle || 'Position Inquiry'}`,
      html: emailHtml,
      reply_to: inquiryData.email
    };

    console.log('=== EMAIL PAYLOAD ===');
    console.log('From:', emailPayload.from);
    console.log('To:', emailPayload.to);
    console.log('Reply-to:', emailPayload.reply_to);
    console.log('Subject:', emailPayload.subject);
    console.log('Company:', inquiryData.companyName);

    console.log('=== CALLING RESEND API ===');
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const responseText = await emailResponse.text();
    console.log('=== RESEND API RESPONSE ===');
    console.log('Status:', emailResponse.status);
    console.log('Status Text:', emailResponse.statusText);
    console.log('Response Body:', responseText);

    if (!emailResponse.ok) {
      console.error('=== RESEND API ERROR ===');
      console.error('Status:', emailResponse.status);
      console.error('Body:', responseText);
      
      let errorMessage = 'Failed to send email. ';
      
      if (emailResponse.status === 401) {
        errorMessage += 'The email service API key is invalid or expired. Please check your Resend API key configuration in Supabase. Contact hire@shiftorl.site if this persists.';
      } else if (emailResponse.status === 403) {
        errorMessage += 'The sender domain (info@shiftorl.site) is not verified in Resend. Please verify your domain. Contact hire@shiftorl.site if this persists.';
      } else {
        errorMessage += 'Please contact us directly at hire@shiftorl.site';
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorMessage,
          debug: { 
            status: emailResponse.status, 
            response: responseText,
            timestamp: new Date().toISOString()
          }
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailResult = JSON.parse(responseText);
    console.log('=== SUCCESS ===');
    console.log('Email sent successfully! ID:', emailResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Inquiry submitted successfully! We will get back to you within 3 business days.',
        emailId: emailResult.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('=== EXCEPTION ===');
    console.error('Error processing hire inquiry:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to process inquiry. Please try again or contact hire@shiftorl.site',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
