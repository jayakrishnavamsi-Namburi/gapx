

// // services/pdfService.js - EXACT MATCH to your LaTeX template style
// import PDFDocument from "pdfkit";
// import fs from "fs";

// export const generateResumePDF = (resumeData, filePath, config = {}) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ 
//         margin: 36, // Matches LaTeX fullpage margins
//         size: 'A4'
//       });

//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       let yPosition = 50;

//       // ===== HEADING - EXACT LaTeX TABLE LAYOUT =====
//       doc.fontSize(20)
//          .font('Helvetica-Bold')
//          .fillColor('#000000')
//          .text(resumeData.personal.name || 'Name', 50, yPosition, { 
//            width: 300, 
//            align: 'left' 
//          });
      
//       // Right side contact info
//       const contactRight = [];
//       if (resumeData.personal.email) contactRight.push(`Email: ${resumeData.personal.email}`);
//       if (resumeData.personal.phone) contactRight.push(`Mobile: ${resumeData.personal.phone}`);
      
//       doc.fontSize(10)
//          .font('Helvetica')
//          .fillColor('#000000')
//          .text(contactRight.join('\n'), 380, yPosition, { 
//            width: 200, 
//            align: 'right' 
//          });

//       yPosition += 60;

//       // ===== EDUCATION SECTION =====
//       doc.fontSize(14)
//          .font('Helvetica-Bold')
//          .fillColor('#000000')
//          .text("Education", 50, yPosition);
      
//       doc.moveTo(50, yPosition + 18)
//          .lineTo(550, yPosition + 18)
//          .lineWidth(1)
//          .stroke('#000000');
      
//       yPosition += 40;

//       if (resumeData.education?.length > 0) {
//         resumeData.education.forEach(edu => {
//           // University & Location (left column)
//           doc.fontSize(11)
//              .font('Helvetica-Bold')
//              .text(edu.institution || '', 50, yPosition);
//           doc.fontSize(10)
//              .font('Helvetica')
//              .text(edu.location || '', 50, yPosition + 15);

//           // Degree & Dates (right column)
//           doc.fontSize(11)
//              .font('Helvetica-Bold')
//              .text(edu.degree || '', 380, yPosition);
//           doc.fontSize(10)
//              .font('Helvetica')
//              .text(edu.year || '', 380, yPosition + 15);

//           yPosition += 45;
//         });
//       }
//       yPosition += 10;

//       // ===== EXPERIENCE SECTION =====
//       doc.fontSize(14)
//          .font('Helvetica-Bold')
//          .fillColor('#000000')
//          .text("Experience", 50, yPosition);
      
//       doc.moveTo(50, yPosition + 18)
//          .lineTo(550, yPosition + 18)
//          .lineWidth(1)
//          .stroke('#000000');
      
//       yPosition += 40;

//       if (resumeData.experience?.length > 0) {
//         resumeData.experience.forEach(exp => {
//           // Role & Company (left column)
//           doc.fontSize(11)
//              .font('Helvetica-Bold')
//              .text(exp.role || '', 50, yPosition);
//           doc.fontSize(10)
//              .font('Helvetica')
//              .text(exp.company || '', 50, yPosition + 15);

//           // Dates & Location (right column)
//           doc.fontSize(11)
//              .font('Helvetica')
//              .text(exp.duration || '', 380, yPosition);
//           if (exp.location) {
//             doc.fontSize(10)
//                .font('Helvetica')
//                .text(exp.location, 380, yPosition + 15);
//           }

//           yPosition += 35;

//           // Bullet points
//           if (exp.description) {
//             const bullets = exp.description.split('\n').filter(b => b.trim());
//             bullets.forEach((bullet, i) => {
//               doc.fontSize(10)
//                  .font('Helvetica')
//                  .text(`• ${bullet.trim()}`, 65, yPosition);
//               yPosition += 18;
//             });
//           }
//           yPosition += 5;
//         });
//       }
//       yPosition += 10;

//       // ===== PROJECTS SECTION =====
//       doc.fontSize(14)
//          .font('Helvetica-Bold')
//          .fillColor('#000000')
//          .text("Projects", 50, yPosition);
      
//       doc.moveTo(50, yPosition + 18)
//          .lineTo(550, yPosition + 18)
//          .lineWidth(1)
//          .stroke('#000000');
      
//       yPosition += 40;

//       if (resumeData.projects?.length > 0) {
//         resumeData.projects.forEach((proj, index) => {
//           doc.fontSize(10)
//              .font('Helvetica')
//              .text(`${index + 1}. ${proj.title || ''}`, 50, yPosition);
//           yPosition += 18;

//           if (proj.description) {
//             doc.fontSize(10)
//                .font('Helvetica')
//                .text(proj.description, 65, yPosition, { width: 480 });
//             yPosition += doc.heightOfString(proj.description, { width: 480 }) + 10;
//           }
//         });
//       }
//       yPosition += 10;

//       // ===== SKILLS SECTION =====
//       doc.fontSize(14)
//          .font('Helvetica-Bold')
//          .fillColor('#000000')
//          .text("Skills", 50, yPosition);
      
//       doc.moveTo(50, yPosition + 18)
//          .lineTo(550, yPosition + 18)
//          .lineWidth(1)
//          .stroke('#000000');
      
//       yPosition += 40;

//       if (resumeData.skills?.length > 0) {
//         // Proficient skills
//         doc.fontSize(11)
//            .font('Helvetica-Bold')
//            .text("Proficient:", 50, yPosition);
//         yPosition += 20;

//         const proficient = resumeData.skills.slice(0, 4);
//         proficient.forEach(skill => {
//           doc.fontSize(10)
//              .font('Helvetica')
//              .text(skill, 65, yPosition);
//           yPosition += 16;
//         });

//         // Comfortable skills
//         yPosition += 10;
//         doc.fontSize(11)
//            .font('Helvetica-Bold')
//            .text("Comfortable:", 50, yPosition);
//         yPosition += 20;

//         const comfortable = resumeData.skills.slice(4);
//         comfortable.forEach(skill => {
//           doc.fontSize(10)
//              .font('Helvetica')
//              .text(skill, 65, yPosition);
//           yPosition += 16;
//         });
//       }

//       doc.end();

//       stream.on("finish", () => {
//         console.log("✅ PDF Generated - LaTeX Template Style:", filePath);
//         resolve(filePath);
//       });
//       stream.on("error", reject);

//     } catch (err) {
//       console.error("❌ PDF Error:", err);
//       reject(err);
//     }
//   });
// };



// services/pdfService.js - EXACT MATCH to your uploaded PDF reference
import PDFDocument from "pdfkit";
import fs from "fs";

export const generateResumePDF = (resumeData, filePath, config = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        margin: 50, // Standard margins like your reference PDF
        size: 'A4'
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      let yPosition = 70;

      // ===== NAME - CENTERED LIKE REFERENCE =====
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text(resumeData.personal?.name || 'YOUR NAME', { 
           align: 'center' 
         });
      
      yPosition += 30;

      // ===== CONTACT INFO - ONE LINE, COMMA SEPARATED =====
      const contactInfo = [];
      if (resumeData.personal?.phone) contactInfo.push(resumeData.personal.phone);
      if (resumeData.personal?.email) contactInfo.push(resumeData.personal.email);
      if (resumeData.personal?.location) contactInfo.push(resumeData.personal.location);
      if (resumeData.personal?.linkedin) contactInfo.push(resumeData.personal.linkedin);
      
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#000000')
         .text(contactInfo.join(' | '), { 
           align: 'center' 
         });

      yPosition += 40;

      // ===== SUMMARY SECTION =====
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text("SUMMARY", 50, yPosition);
      
      // Underline
      doc.moveTo(50, yPosition + 15)
         .lineTo(550, yPosition + 15)
         .lineWidth(1)
         .stroke('#000000');
      
      yPosition += 30;

      // Summary text
      if (resumeData.summary) {
        doc.fontSize(10)
           .font('Helvetica')
           .text(resumeData.summary, 50, yPosition, {
             width: 500,
             align: 'left',
             lineGap: 2
           });
        
        yPosition += doc.heightOfString(resumeData.summary, { width: 500 }) + 15;
      }

      // ===== TECHNICAL SKILLS SECTION =====
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text("TECHNICAL SKILLS", 50, yPosition);
      
      // Underline
      doc.moveTo(50, yPosition + 15)
         .lineTo(550, yPosition + 15)
         .lineWidth(1)
         .stroke('#000000');
      
      yPosition += 30;

      // Format skills in columns like the reference
      if (resumeData.skills) {
        const skillsText = typeof resumeData.skills === 'string' 
          ? resumeData.skills 
          : Array.isArray(resumeData.skills) 
            ? resumeData.skills.join(', ')
            : '';
        
        doc.fontSize(10)
           .font('Helvetica')
           .text(skillsText, 50, yPosition, {
             width: 500,
             align: 'left',
             lineGap: 3
           });
        
        yPosition += doc.heightOfString(skillsText, { width: 500 }) + 20;
      }

      // ===== EXPERIENCE SECTION =====
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text("EXPERIENCE", 50, yPosition);
      
      // Underline
      doc.moveTo(50, yPosition + 15)
         .lineTo(550, yPosition + 15)
         .lineWidth(1)
         .stroke('#000000');
      
      yPosition += 30;

      if (resumeData.experiences?.length > 0) {
        resumeData.experiences.forEach(exp => {
          // Role - Bold
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(exp.role || '', 50, yPosition);
          
          // Company and Date on same line
          const companyDate = [];
          if (exp.company) companyDate.push(exp.company);
          if (exp.duration) companyDate.push(exp.duration);
          
          doc.fontSize(10)
             .font('Helvetica')
             .text(companyDate.join(' | '), 250, yPosition);
          
          yPosition += 20;

          // Description with bullets
          if (exp.description) {
            const bullets = exp.description.split('\n').filter(b => b.trim());
            bullets.forEach(bullet => {
              doc.fontSize(10)
                 .font('Helvetica')
                 .text(`• ${bullet.trim()}`, 65, yPosition, {
                   width: 485,
                   align: 'left',
                   lineGap: 2
                 });
              
              yPosition += doc.heightOfString(`• ${bullet.trim()}`, { width: 485 }) + 2;
            });
          }
          yPosition += 10;
        });
      } else if (resumeData.experience?.length > 0) {
        // Fallback to experience field
        resumeData.experience.forEach(exp => {
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(exp.role || '', 50, yPosition);
          
          const companyDate = [];
          if (exp.company) companyDate.push(exp.company);
          if (exp.duration) companyDate.push(exp.duration);
          
          doc.fontSize(10)
             .font('Helvetica')
             .text(companyDate.join(' | '), 250, yPosition);
          
          yPosition += 20;

          if (exp.description) {
            const bullets = exp.description.split('\n').filter(b => b.trim());
            bullets.forEach(bullet => {
              doc.fontSize(10)
                 .font('Helvetica')
                 .text(`• ${bullet.trim()}`, 65, yPosition, {
                   width: 485,
                   align: 'left',
                   lineGap: 2
                 });
              
              yPosition += doc.heightOfString(`• ${bullet.trim()}`, { width: 485 }) + 2;
            });
          }
          yPosition += 10;
        });
      }

      // ===== PROJECT EXPERIENCE SECTION =====
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text("PROJECT EXPERIENCE", 50, yPosition);
      
      // Underline
      doc.moveTo(50, yPosition + 15)
         .lineTo(550, yPosition + 15)
         .lineWidth(1)
         .stroke('#000000');
      
      yPosition += 30;

      if (resumeData.projects?.length > 0) {
        resumeData.projects.forEach(proj => {
          // Project Title - Bold
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(proj.title || '', 50, yPosition);
          
          // Role and links on same line
          const roleLinks = [];
          if (proj.role) roleLinks.push(proj.role);
          if (proj.live) roleLinks.push('LiveDemo');
          if (proj.github) roleLinks.push('GitHub');
          
          doc.fontSize(10)
             .font('Helvetica')
             .text(roleLinks.join(' | '), 300, yPosition);
          
          yPosition += 20;

          // Description with bullets
          if (proj.description) {
            const bullets = proj.description.split('\n').filter(b => b.trim());
            bullets.forEach(bullet => {
              doc.fontSize(10)
                 .font('Helvetica')
                 .text(`• ${bullet.trim()}`, 65, yPosition, {
                   width: 485,
                   align: 'left',
                   lineGap: 2
                 });
              
              yPosition += doc.heightOfString(`• ${bullet.trim()}`, { width: 485 }) + 2;
            });
          }
          
          // Tech Stack if available
          if (proj.techStack) {
            doc.fontSize(10)
               .font('Helvetica')
               .text(`Tech Stack: ${proj.techStack}`, 65, yPosition, {
                 width: 485
               });
            
            yPosition += 20;
          }
          
          yPosition += 5;
        });
      }

      // ===== EDUCATION SECTION =====
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text("EDUCATION", 50, yPosition);
      
      // Underline
      doc.moveTo(50, yPosition + 15)
         .lineTo(550, yPosition + 15)
         .lineWidth(1)
         .stroke('#000000');
      
      yPosition += 30;

      if (resumeData.education?.length > 0) {
        resumeData.education.forEach(edu => {
          // Degree - Bold
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(edu.degree || '', 50, yPosition);
          
          // Institution and Year on next line
          yPosition += 15;
          
          doc.fontSize(10)
             .font('Helvetica')
             .text(edu.institution || '', 50, yPosition);
          
          if (edu.year) {
            doc.fontSize(10)
               .font('Helvetica')
               .text(edu.year, 450, yPosition);
          }
          
          yPosition += 25;
        });
      }

      // ===== CERTIFICATIONS SECTION =====
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text("CERTIFICATIONS", 50, yPosition);
      
      // Underline
      doc.moveTo(50, yPosition + 15)
         .lineTo(550, yPosition + 15)
         .lineWidth(1)
         .stroke('#000000');
      
      yPosition += 30;

      // Handle certifications safely - could be string, array, or object
      if (resumeData.certifications) {
        let certsArray = [];
        
        if (typeof resumeData.certifications === 'string') {
          // If it's a string, split by newlines or commas
          certsArray = resumeData.certifications.split('\n').filter(c => c.trim());
          if (certsArray.length === 1 && certsArray[0].includes(',')) {
            certsArray = certsArray[0].split(',').map(c => c.trim());
          }
        } else if (Array.isArray(resumeData.certifications)) {
          // If it's an array, use it directly
          certsArray = resumeData.certifications;
        } else if (typeof resumeData.certifications === 'object') {
          // If it's an object, convert to array of values
          certsArray = Object.values(resumeData.certifications);
        }
        
        // Filter out empty values
        certsArray = certsArray.filter(c => c && typeof c === 'string' && c.trim() !== '');
        
        if (certsArray.length > 0) {
          certsArray.forEach(cert => {
            doc.fontSize(10)
               .font('Helvetica')
               .text(`• ${cert.trim()}`, 65, yPosition, {
                 width: 485
               });
            
            yPosition += 18;
          });
        } else {
          // If no valid certifications, add a placeholder
          doc.fontSize(10)
             .font('Helvetica')
             .text('• No certifications listed', 65, yPosition);
          yPosition += 18;
        }
      } else {
        // If no certifications at all
        doc.fontSize(10)
           .font('Helvetica')
           .text('• No certifications listed', 65, yPosition);
        yPosition += 18;
      }

      doc.end();

      stream.on("finish", () => {
        console.log("✅ PDF Generated - Reference Image Style:", filePath);
        resolve(filePath);
      });
      stream.on("error", reject);

    } catch (err) {
      console.error("❌ PDF Error:", err);
      reject(err);
    }
  });
};