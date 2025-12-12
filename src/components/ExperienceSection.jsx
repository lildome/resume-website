import React from 'react';

const ExperienceSection = ({ experience }) => {
  return (
    <section>
      <h2>Professional Experience</h2>
      <div>
        {experience.map((job, index) => (
          <div 
            key={index} 
            className="job-entry"
          >
            <div>
              <h4>{job.title}</h4>
              <span>{job.period}</span>
            </div>
            <p>{job.company}</p>
            <ul>
              {job.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;