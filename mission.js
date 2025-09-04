        // Create realistic star field
        function createStars() {
            const starsContainer = document.querySelector('.stars');
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                const size = Math.random() > 0.85 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5;
                star.style.width = size + 'px';
                star.style.height = size + 'px';
                
                // Different star colors
                const starType = Math.random();
                if (starType < 0.6) {
                    star.style.background = '#ffffff';
                } else if (starType < 0.8) {
                    star.style.background = '#ffd54f';
                } else {
                    star.style.background = '#ff8a65';
                }
                
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                star.style.left = x + '%';
                star.style.top = y + '%';
                star.style.animationDelay = Math.random() * 4 + 's';
                star.style.animationDuration = (Math.random() * 4 + 3) + 's';
                
                starsContainer.appendChild(star);
            }
        }

        // RPO Demonstration functionality
        function initRPODemo() {
            const startBtn = document.getElementById('startDemo');
            const statusText = document.querySelector('.demo-status');
            const demoSpace = document.querySelector('.demo-space');
            
            // Check if elements exist
            if (!startBtn || !statusText || !demoSpace) {
                console.log('RPO Demo elements not found');
                return;
            }
            
            let isRunning = false;
            let statusInterval;
            
            startBtn.addEventListener('click', function() {
                console.log('RPO Demo button clicked, isRunning:', isRunning);
                
                if (!isRunning) {
                    // Start demonstration
                    isRunning = true;
                    demoSpace.classList.add('rpo-active');
                    startBtn.textContent = 'Stop Demo';
                    startBtn.style.background = 'linear-gradient(135deg, rgba(220, 50, 50, 0.8) 0%, rgba(180, 50, 50, 0.6) 100%)';
                    
                    // Update status messages during demo
                    const statusMessages = [
                        'Initializing approach sequence...',
                        'Chaser satellite deploying thrusters...',
                        'Beginning orbital intercept...',
                        'Executing proximity operations...',
                        'Maintaining safe distance...',
                        'Completing orbital survey...',
                        'Preparing for rendezvous...',
                        'Mission objectives achieved!'
                    ];
                    
                    let messageIndex = 0;
                    statusText.textContent = statusMessages[messageIndex];
                    
                    statusInterval = setInterval(function() {
                        messageIndex++;
                        if (messageIndex < statusMessages.length) {
                            statusText.textContent = statusMessages[messageIndex];
                        } else {
                            clearInterval(statusInterval);
                        }
                    }, 1500);
                    
                } else {
                    // Stop demonstration
                    isRunning = false;
                    demoSpace.classList.remove('rpo-active');
                    startBtn.textContent = 'Start RPO Demo';
                    startBtn.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.8) 0%, rgba(50, 205, 50, 0.6) 100%)';
                    statusText.textContent = 'Ready to demonstrate approach, orbit, and rendezvous';
                    
                    // Clear any running status updates
                    if (statusInterval) {
                        clearInterval(statusInterval);
                    }
                }
            });
        }

        // Custom cursor functionality
        const cursor = document.querySelector('.custom-cursor');
        
        if (cursor) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
            
            // Cursor hover effects for team members, nav, and demo button
            document.addEventListener('mouseenter', (e) => {
                if (e.target.closest('.team-member') || e.target.closest('.prism-nav') || e.target.closest('.demo-btn')) {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.8), 0 0 50px rgba(138, 43, 226, 0.4)';
                }
            }, true);
            
            document.addEventListener('mouseleave', (e) => {
                if (e.target.closest('.team-member') || e.target.closest('.prism-nav') || e.target.closest('.demo-btn')) {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.boxShadow = '0 0 10px rgba(138, 43, 226, 0.6), 0 0 20px rgba(138, 43, 226, 0.3)';
                }
            }, true);
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            initRPODemo();
        });

        // Performance optimization - pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const spaceContainer = document.querySelector('.space-container');
            const demoSpace = document.querySelector('.demo-space');
            
            if (document.hidden) {
                spaceContainer.style.animationPlayState = 'paused';
                if (demoSpace.classList.contains('rpo-active')) {
                    demoSpace.style.animationPlayState = 'paused';
                }
            } else {
                spaceContainer.style.animationPlayState = 'running';
                if (demoSpace.classList.contains('rpo-active')) {
                    demoSpace.style.animationPlayState = 'running';
                }
            }
        });
