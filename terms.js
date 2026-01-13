// =========================================
        // 1. DATA CONFIGURATION
        // =========================================
        const termsData = [
            { t: "Acceptance of Terms", f: "By accessing or using this website, you agree to be bound by these Terms & Conditions.", b: "If you do not agree, strictly discontinue use. Continued use implies full acceptance." },
            { t: "Website Purpose", f: "This platform provides informational and utility-based tools related to social media.", b: "Tools assist in understanding online presence. We do not guarantee specific outcomes." },
            { t: "Eligibility", f: "Users must be at least 13 years of age to use this website.", b: "You confirm you meet the age requirement. Parents are responsible for minors." },
            { t: "User Responsibilities", f: "Users agree to use the website only for lawful purposes.", b: "Misuse, abuse, or disrupting services is prohibited. You are responsible for your actions." },
            { t: "No Professional Advice", f: "Content provided on this website is for informational purposes only.", b: "Not considered professional, legal, or financial advice. Make independent decisions." },
            { t: "Accuracy of Information", f: "We strive to keep all information accurate and up to date.", b: "We do not guarantee completeness. Content may be updated without notice." },
            { t: "Tool Usage Disclaimer", f: "Tools are provided “as-is” and “as-available.”", b: "No guarantee of error-free functionality. Results may vary based on input." },
            { t: "User-Submitted Data", f: "Any data submitted by users is provided voluntarily.", b: "You are responsible for your content. We do not validate user-submitted info." },
            { t: "Data Storage & Processing", f: "Submitted data may be temporarily stored for processing or functionality.", b: "We do not sell data. Data handling follows reasonable security practices." },
            { t: "Intellectual Property", f: "All website content, design, branding, and layout are owned by GI28.", b: "Unauthorized copying is prohibited. No commercial use without permission." },
            { t: "Third-Party Services", f: "The website may integrate third-party tools or services.", b: "We are not responsible for third-party content. You interact at your own risk." },
            { t: "External Links", f: "This website may contain links to external websites.", b: "We do not endorse external content. Visiting links is at your discretion." },
            { t: "Availability of Services", f: "Website features may be modified, suspended, or discontinued at any time.", b: "Not liable for interruptions. Maintenance or updates may cause downtime." },
            { t: "Limitation of Liability", f: "We are not liable for any direct or indirect damages arising from website use.", b: "Includes data loss or service interruptions. Use is entirely at your own risk." },
            { t: "Prohibited Activities", f: "Users must not attempt to hack, exploit, or reverse-engineer the platform.", b: "Automated abuse or scraping is forbidden. Violations result in access restriction." },
            { t: "Changes to Terms", f: "These Terms & Conditions may be updated periodically.", b: "Continued use implies acceptance. Please review this page regularly." },
            { t: "Fair Usage Policy", f: "Users must use the platform fairly and within reasonable limits.", b: "Excessive requests or abuse leads to bans. We monitor usage for stability." },
            { t: "Account & Tool Access", f: "Some features may require user input or interaction to function properly.", b: "No account required unless stated. Access is non-transferable and for personal use." },
            { t: "Automated Systems", f: "Certain features may use automated or algorithm-based processes.", b: "Systems use predefined logic/public data. No guarantee of error-free automation." },
            { t: "No Affiliation", f: "This website operates independently and is not connected to any social media company.", b: "Brand names are for identification only. No partnership or endorsement implied." },
            { t: "User-Generated Input", f: "Any information submitted by users is provided voluntarily.", b: "You ensure accuracy. We are not liable for misleading user inputs." },
            { t: "Security Measures", f: "We implement reasonable security practices to protect platform integrity.", b: "No system is 100% secure. Maintain safe browsing practices." },
            { t: "Abuse Handling", f: "Any attempt to exploit system vulnerabilities is strictly prohibited.", b: "Violations lead to termination. Serious issues may be reported to authorities." },
            { t: "Service Modifications", f: "Features and tools may be updated, improved, or removed over time.", b: "We aim to enhance experience. Continued use implies acceptance of changes." },
            { t: "Performance Disclaimer", f: "Website performance may vary based on device, network, or browser.", b: "Not responsible for delays by third-parties. Outages may occur for maintenance." },
            { t: "Content Availability", f: "Some content may be updated, replaced, or removed periodically.", b: "No guarantee of permanent availability. Outdated content may remain visible." },
            { t: "Advertising", f: "This website may display advertisements to support platform maintenance.", b: "Ads provided by third-parties (e.g., AdSense). We do not control ad content." },
            { t: "Policy Compliance", f: "Users agree to comply with all applicable laws and regulations.", b: "Must not violate third-party terms. Non-compliance results in restricted access." },
            { t: "Disclaimer of Warranties", f: "All services are provided without warranties of any kind.", b: "We disclaim implied warranties. Access is at your own discretion." },
            { t: "Indemnification", f: "Users agree to indemnify and hold harmless GI28 from any claims.", b: "Includes misuse or unlawful activity. Responsibility lies solely with the user." },
            { t: "Termination of Access", f: "We reserve the right to terminate or suspend access at any time.", b: "Due to violations or security. No prior notice required in severe cases." },
            { t: "Severability", f: "If any part of these terms is found unenforceable, remaining sections remain valid.", b: "Invalid clauses shall not affect overall agreement enforceability." },
            { t: "Entire Agreement", f: "These Terms constitute the entire agreement between users and GI28.", b: "No external agreements override these conditions unless explicitly stated." },
            { t: "Updates & Revisions", f: "Terms may be revised to reflect legal or operational changes.", b: "You are responsible for reviewing updates. The latest version always applies." },
            { t: "Contact & Support", f: "Questions or concerns may be addressed via the Contact page.", b: "We strive to respond professionally. Feedback is welcomed to improve quality." }
        ];

        // =========================================
        // 2. ICON & COLOR GENERATOR
        // =========================================
        // Helper to get a random neon color from our variables
        const colors = ['--neon-magenta', '--neon-cyan', '--neon-purple', '--neon-gold', '--neon-green', '--neon-red'];
        
        // Simple SVG Path mapping based on modulo logic to keep file size small but varied
        const icons = [
            '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', // Shield
            '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>', // Info
            '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', // Users
            '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>', // Desktop
            '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>', // Cube
            '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>', // File
            '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>', // Activity
            '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22 6 12 13 2 6"></polyline>', // Mail
            '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' // Settings
        ];

        // =========================================
        // 3. GENERATE CARDS
        // =========================================
        const grid = document.getElementById('grid-container');

        termsData.forEach((term, index) => {
            const num = index + 1;
            const displayNum = num < 10 ? `0${num}` : num;
            const colorVar = colors[index % colors.length];
            const iconSvg = icons[index % icons.length];

            const html = `
            <div class="card-scene" id="card-${index}">
                <div class="card-object">
                    <div class="card-face face-front" style="--border-glow: var(${colorVar})">
                        <span class="term-number">${displayNum}</span>
                        <div class="icon-box" style="color: var(${colorVar}); border-color: rgba(255,255,255,0.1);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSvg}</svg>
                        </div>
                        <h3>${term.t}</h3>
                        <p>${term.f}</p>
                        <div class="drag-hint" style="color: var(${colorVar})">⟲ Swipe to flip</div>
                    </div>
                    <div class="card-face face-back" style="border-color: var(${colorVar}); box-shadow: 0 0 20px -5px var(${colorVar});">
                        <h3 style="color: var(${colorVar})">Details</h3>
                        <p class="back-text">${term.b}</p>
                    </div>
                </div>
            </div>`;
            
            grid.insertAdjacentHTML('beforeend', html);
        });

        // =========================================
        // 4. INTERACTION LOGIC (DRAG TO ROTATE)
        // =========================================
        const cards = document.querySelectorAll('.card-scene');

        cards.forEach(card => {
            const object = card.querySelector('.card-object');
            let isDragging = false;
            let startX, startY;
            let currentRotation = 0;
            let previousRotation = 0;

            // Start Drag
            const startDrag = (e) => {
                isDragging = true;
                if (e.type === 'touchstart') {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                } else {
                    startX = e.pageX;
                    startY = e.pageY;
                }
                card.style.cursor = 'grabbing';
                object.style.transition = 'none'; 
            };

            // On Drag
            const onDrag = (e) => {
                if (!isDragging) return;

                let x, y;
                if (e.type === 'touchmove') {
                    x = e.touches[0].pageX;
                    y = e.touches[0].pageY;
                } else {
                    x = e.pageX;
                    y = e.pageY;
                }

                const diffX = x - startX;
                const diffY = y - startY;

                // SCROLL LOGIC FIX
                if (Math.abs(diffY) > Math.abs(diffX) && e.type === 'touchmove') {
                    return; // Allow vertical scroll
                }
                if (e.cancelable && e.type === 'touchmove') {
                    e.preventDefault(); 
                }

                // Sensitivity factor
                currentRotation = previousRotation + (diffX * 0.5);
                object.style.transform = `rotateY(${currentRotation}deg)`;
            };

            // Stop Drag
            const stopDrag = () => {
                if (!isDragging) return;
                isDragging = false;
                card.style.cursor = 'grab';
                previousRotation = currentRotation;
                object.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Elastic snap
            };

            card.addEventListener('mousedown', startDrag);
            card.addEventListener('touchstart', startDrag, { passive: false });

            window.addEventListener('mousemove', onDrag);
            window.addEventListener('touchmove', onDrag, { passive: false });

            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('touchend', stopDrag);
        });
