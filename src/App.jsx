import React, { useState, useEffect, useMemo } from 'react';
import ResumeHeader from './components/ResumeHeader.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import EducationSection from './components/EducationSection.jsx';

// --- API CONFIGURATION ---
const API_BASE_URL = 'https://4kz77au651.execute-api.us-east-1.amazonaws.com/resume';

// --- HARDCODED CONTACT INFO ---
const hardcodedContactInfo = {
    phone: '0488 171 909',
    email: 'dominickfprofico@gmail.com',
    linkedin: 'https://www.linkedin.com/in/dominick-profico-4668b8272',
    location: 'Southbank, Victoria'
};

const App = () => {
    // State for storing all fetched profiles (cached)
    const [profileData, setProfileData] = useState({});
    // State for tracking the currently displayed profile
    const [currentProfileKey, setCurrentProfileKey] = useState('SE');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Define the keys for available profiles
    const profileKeys = useMemo(() => ['SE', 'DE', 'DS'], []); 

    // API fetching logic with exponential backoff
    const fetchData = async (profileKey) => {
        if (profileData[profileKey] && profileKey === currentProfileKey) {
            return;
        }

        setIsLoading(true);
        setError(null);
        setCurrentProfileKey(profileKey);
        
        const url = `${API_BASE_URL}/${profileKey}`;
        
        const maxRetries = 3;
        let attempt = 0;
        let success = false;
        
        while (attempt < maxRetries && !success) {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch profile: ${profileKey} (${response.status} ${response.statusText}).`);
                }
                
                const data = await response.json();
                
                setProfileData(prevData => ({
                    ...prevData,
                    [profileKey]: data,
                }));
                
                success = true;
                
            } catch (err) {
                attempt++;
                if (attempt >= maxRetries) {
                    console.error(`API Fetch Error after ${maxRetries} attempts:`, err);
                    setError(err.message || "An unknown error occurred while fetching data.");
                } else {
                    const delay = Math.pow(2, attempt) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        setIsLoading(false);
    };

    // Fetch the default 'SE' profile on initial load
    useEffect(() => {
        if (Object.keys(profileData).length === 0) {
            profileKeys.map((key) => fetchData(key));
        }
    }, []); 

    const currentProfile = profileData[currentProfileKey];

    // --- MAIN RENDER ---
    return (
        <div className='app-wrapper'>
            {/* Resume Container */}
            <div className='resume-container'>
                
                {/* 1. Header and Profile Selector */}
                <ResumeHeader 
                    currentProfile={currentProfile}
                    hardcodedContactInfo={hardcodedContactInfo}
                    profileKeys={profileKeys}
                    currentProfileKey={currentProfileKey}
                    fetchData={fetchData}
                    isLoading={isLoading}
                    profileData={profileData}
                />
                
                {/* 2. Data Display Area */}
                {isLoading && !currentProfile ? (
                    <div>
                        <p>Loading {currentProfileKey} Profile Data...</p>
                        <p>Fetching profile from API Gateway.</p>
                    </div>
                ) : error ? (
                    <div>
                        <p>Error Loading Data</p>
                        <p>{error}</p>
                    </div>
                ) : currentProfile ? (
                    // Display Structured Data
                    <main>
                        <div className='sidebar-column'>
                            {/* Skills */}
                            {currentProfile.skills && <SkillsSection skills={currentProfile.skills} />}

                            {/* Education */}
                            {currentProfile.education && <EducationSection education={currentProfile.education} />}
                        </div>
                        <div className='main-column'>
                            {/* Summary */}
                            <section>
                                <h2>Professional Summary</h2>
                                <div className='professional-summary-card'>
                                    <p>{currentProfile.summary}</p>
                                </div>
                            </section>

                            {/* Experience */}
                            {currentProfile.experience && <ExperienceSection experience={currentProfile.experience} />}
                        </div>
                        
                        
                    </main>
                ) : (
                    <div>
                        <p>Select a profile to load data from the API endpoint.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;