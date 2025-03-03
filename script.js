document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }
                
                // Update active link
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const targetId = section.getAttribute('id');
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Project Modal
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    // Project details data (normally would come from a database)
    const projectDetails = {
        project1: {
            title: "My portfolio",
            description: "My first portfolio website with details about me, Developed with HTML, CSS and JavaScript. Main features include:<br><br>" +
            "- Write HTML for structure<br>" +
            "- Write CSS for decorate<br>" +
            "- Write Js for contact system and more<br>",
            challenges: "I don't know how JavaScript works and how to write JavaScript",
            solutions: "Watch teaching methods from other people and Youtube. Ask senior to find the answer.",
            technologies: ["HTML", "CSS", "JavaScript", "VSCode"]
        },
        project2: {
            title: "Blue lyrics",
            description: "The console runs following the Blue lyrics song by using C language:<br><br>" +
            "- Create print animation like ChatGPT<br>" +
            "- Create delay function<br>" +
            "- Create Set color function<br>",
            challenges: "Set delay and print animation following the song",
            solutions: "Use patience",
            technologies: ["C", "CodeBlocks"]
        },
        project3: {
            title: "Card game",
            description: "Run console and play card game kidda like Pokemon tcg poket<br></br>" + 
            "- Delay system<br>" +
            "- Shop system<br>" + 
            "- Random card system<br>" +
            "- Economy system<br>" + 
            "- Gift code system<br>" +
            "- Inventory system<br>",
            challenges: "Delay system is so difficult, but a random system is much harder, anyway everything is so much difficult",
            solutions: "Just use ChatGPT to help",
            technologies: ["C", "CodeBlocks"]
        }
    };
    
    // Open modal when view details button is clicked
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                let techHtml = '';
                project.technologies.forEach(tech => {
                    techHtml += `<span class="tech-tag">${tech}</span>`;
                });
                
                modalContent.innerHTML = `
                    <h2>• ${project.title}</h2>
                    <br/>
                    <div class="project-detail-content">
                        <h3>Project details</h3>
                        <p>${project.description}</p>
                        <br/>
                        
                        <h3>Challenges</h3>
                        <p>${project.challenges}</p>
                        <br/>
                        
                        <h3>Solutions</h3>
                        <p>${project.solutions}</p>
                        <br/>
                        
                        <h3>Tecahnologies</h3>
                        <div class="project-tech">
                            ${techHtml}
                        </div>
                    </div>
                `;
                
                modal.style.display = 'flex';
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send this data to your server
        // For demonstration, we'll simulate a successful submission
        formStatus.textContent = 'Successfully sent message!';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    });
});

// code from: https://github.com/Chokdee-Sigazen/Devcommu_Webdev_Bootcamp_demo/blob/main/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Programmer", "Athlete"];
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
