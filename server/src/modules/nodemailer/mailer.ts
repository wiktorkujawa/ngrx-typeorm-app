import * as nodemailer from 'nodemailer'; 

    export class GMailService { 
      private _transporter: nodemailer.Transporter; 
      constructor() { 
        this._transporter = nodemailer.createTransport( 
          `smtps://${process.env.APP_EMAIL}%40gmail.com:${process.env.APP_PASSWORD}@smtp.gmail.com` 
        ); 
      } 
      sendMail(to: string, subject: string, content: string) { 
        let options = { 
          from: process.env.SUPPORT_EMAIL, 
          to: to, 
          subject: subject, 
          html: content 
        } 
 
        this._transporter.sendMail(  
          options, (error, info) => { 
            if (error) { 
              return console.log(`error: ${error}`); 
            } 
            console.log(`Message Sent ${info.response}`); 
          }); 
      } 
    } 