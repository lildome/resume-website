import React from 'react';

const ResumeHeader = ({ currentProfile, hardcodedContactInfo, profileKeys, currentProfileKey, fetchData, isLoading, profileData }) => {
    
    const name = "Dominick Profico";

    return (
        <header className='header'>
            <div className='header-title-and-selector'>
                <div className='header-title-block'>
                    <h1>
                        {name}
                    </h1>
                </div>
                {/* Profile Selector */}
                <div className='profile-selector'>
                    {profileKeys.map(key => (
                        <button
                            key={key}
                            onClick={() => {
                                fetchData(key);
                            }}
                            disabled={isLoading}
                            className={`profile-button ${ currentProfileKey === key ? 'active' : ''}`}
                        >
                            {profileData[key]?.profileName || key}
                        </button>
                    ))}
                </div>
            </div>
            {/* Contact Info Row */}
            <div className='contact-info'>
                <span className='contact-item contact-location'>
                    <i className='icon-placeholder'>📍</i>
                    {hardcodedContactInfo.location}
                </span>
                <span className='contact-item contact-phone'>
                    <i className='icon-placeholder'>📞</i>
                    {hardcodedContactInfo.phone} 
                </span>
                <span className='contact-item contact-email'>
                    <i className='icon-placeholder'>✉️</i>
                    {hardcodedContactInfo.email}
                </span>
                <a 
                    href={hardcodedContactInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='contact-item contact-linkedin' 
                >
                    <i className='icon-placeholder'>🔗</i>
                    LinkedIn Profile
                </a>
            </div>
        </header>
    );
};

export default ResumeHeader;