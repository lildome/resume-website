import React from 'react';

const EducationSection = ({ education }) => {
  return (
    <section>
      <h2>Education</h2>
      <div>
        {education.map((item, index) => (
          <div key={index} className='education-entry'>
            <div>
              <h4>{item.degree}</h4>
              <span>{item.period}</span>
            </div>
            <p>{item.institution}</p>
            <p>{item.gpa}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;