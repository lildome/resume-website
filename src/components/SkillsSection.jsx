import React, { useState } from 'react';

const SkillsSection = ({ skills }) => {

  const [openSkillId, setOpenSkillId] = useState(null);

  const toggleSkillDetails = (id) => {
    setOpenSkillId(prevID => prevID === id ? null : id)
  };

  return (
    <section>
      <h2>Technical Skills</h2>
      <div>
        {skills.map((skillGroup, index) => (
          <div key={index} className="skill-group">
            <h3>{skillGroup.category}</h3>
            <div className="skill-badge-group">
              {skillGroup.items.map((item, itemIndex) => {

                const skillId = `${skillGroup.category}-${item.name}`;
                const isOpen = openSkillId === skillId;

                return (
                  <div key={index} className={`skill-wrapper ${isOpen ? 'open-skill' : ''}`}>
                    <button 
                      key={itemIndex} 
                      className="skill-badge" 
                      onMouseEnter={() => toggleSkillDetails(skillId)} 
                      onMouseLeave={() => toggleSkillDetails(null)}
                    >
                      {item.name}
                    </button>
                    {isOpen && item.description && (
                      <div className="sub-skill-details">
                        <ul className="sub-skill-list">
                          {item.description.split(",").map((detail, dIndex) => (
                            <li key={dIndex} className="sub-skill-item">
                              {detail.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;