const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
  experience?: string;
  location?: string;
  message?: string;
  skill1?: string;
  skill2?: string;
  skill3?: string;
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

    const formData = await req.formData();
    
    const applicationData: ApplicationData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string || '',
      experience: formData.get('experience') as string || '',
      location: formData.get('location') as string || '',
      message: formData.get('message') as string || '',
      skill1: formData.get('skill1') as string || '',
      skill2: formData.get('skill2') as string || '',
      skill3: formData.get('skill3') as string || ''
    };

    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email || !applicationData.phone) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields. Please fill in first name, last name, email, and phone.' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
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

    const resumeFile = formData.get('resume') as File | null;
    let resumeAttachment = null;

    if (resumeFile && resumeFile.size > 0) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(resumeFile.type)) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Invalid file type. Please upload a PDF, DOC, or DOCX file.' 
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      if (resumeFile.size > 10 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'File too large. Please upload a file smaller than 10MB.' 
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      const resumeBuffer = await resumeFile.arrayBuffer();
      const resumeBase64 = btoa(String.fromCharCode(...new Uint8Array(resumeBuffer)));
      
      resumeAttachment = {
        filename: resumeFile.name,
        content: resumeBase64
      };
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #ff66c4 0%, #ff4da6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Job Application</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">ShiftORL Talent Portal</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Applicant Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0; color: #333;">${applicationData.firstName} ${applicationData.lastName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #333;"><a href="mailto:${applicationData.email}" style="color: #ff66c4; text-decoration: none;">${applicationData.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #333;">${applicationData.phone}</td></tr>
              ${applicationData.position ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Position:</td><td style="padding: 8px 0; color: #333;">${applicationData.position}</td></tr>` : ''}
              ${applicationData.experience ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Experience:</td><td style="padding: 8px 0; color: #333;">${applicationData.experience}</td></tr>` : ''}
              ${applicationData.location ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Location:</td><td style="padding: 8px 0; color: #333;">${applicationData.location}</td></tr>` : ''}
            </table>
          </div>

          ${applicationData.skill1 || applicationData.skill2 || applicationData.skill3 ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Skills</h2>
            <ul style="margin: 0; padding-left: 20px; color: #333;">
              ${applicationData.skill1 ? `<li>${applicationData.skill1}</li>` : ''}
              ${applicationData.skill2 ? `<li>${applicationData.skill2}</li>` : ''}
              ${applicationData.skill3 ? `<li>${applicationData.skill3}</li>` : ''}
            </ul>
          </div>
          ` : ''}

          ${applicationData.message ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Message</h2>
            <p style="margin: 0; color: #333; line-height: 1.6;">${applicationData.message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}

          ${resumeFile ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #ff66c4; padding-bottom: 10px;">Resume</h2>
            <p style="margin: 0; color: #333;">Attached: ${resumeFile.name} (${(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</p>
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
          </div>
        </div>
      </div>
    `;

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service not configured. Please contact info@shiftorl.site' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailPayload: any = {
      from: 'ShiftORL <info@shiftorl.site>',
      to: ['info@shiftorl.site'],
      subject: `New Application: ${applicationData.firstName} ${applicationData.lastName}${applicationData.position ? ` - ${applicationData.position}` : ''}`,
      html: emailHtml,
      reply_to: applicationData.email
    };

    if (resumeAttachment) {
      emailPayload.attachments = [resumeAttachment];
    }

    console.log('Sending application email...');
    console.log('From:', emailPayload.from);
    console.log('To:', emailPayload.to);
    console.log('Applicant:', `${applicationData.firstName} ${applicationData.lastName}`);

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

    if (!emailResponse.ok) {
      console.error('Resend API error - Status:', emailResponse.status);
      console.error('Resend API error - Body:', responseText);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to send application. Please email your resume to info@shiftorl.site',
          debug: { status: emailResponse.status, response: responseText }
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailResult = JSON.parse(responseText);
    console.log('Email sent successfully! ID:', emailResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully! We will review your application and get back to you within 3 business days.',
        emailId: emailResult.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing application:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to process application. Please try again or email info@shiftorl.site',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
