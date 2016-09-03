class ApplicationMailer < ActionMailer::Base
  default from: "TicketsAappx Team <no-reply@#{Rails.application.secrets.domain_name}>"
  layout 'mailer'
end
