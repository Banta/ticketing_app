class StaticPagesController < ApplicationController
  def index
  end

  def tickets_pdf
    require 'openssl'
    require 'base64'

    tickets = Ticket.where(created_at: 30.days.ago..Time.now)

    signature = params[:signature] # Signature received from client
    base_string = params[:base_string] # Base string received from client

    # Generate signature
    gen_signature  = Base64.encode64(OpenSSL::HMAC.digest('sha1', Figaro.env.pdf_secret_key, base_string))
    
    respond_to do |format|
      format.pdf do
        if gen_signature.strip == signature.strip
        pdf = TicketsReportPdf.new(tickets)
        send_data pdf.render, filename: 'report.pdf', type: 'application/pdf'
        else
          redirect_to root_path
        end
      end
    end
  end
end
