async function sendMessage(option = null) {
    let userInput = option || document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (userInput.trim() === "") return;

    let userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = userInput;
    chatbox.appendChild(userMessage);

    document.getElementById("userInput").value = "";

    try {
        let botResponse = await getBotResponse(userInput);

        let botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.innerText = botResponse.message;
        chatbox.appendChild(botMessage);

        if (botResponse.options.length > 0) {
            let optionsContainer = document.createElement("div");
            optionsContainer.className = "options-container";

            botResponse.options.forEach(optionText => {
                let optionButton = document.createElement("button");
                optionButton.className = "option-button";
                optionButton.innerText = optionText;
                optionButton.onclick = () => sendMessage(optionText);
                optionsContainer.appendChild(optionButton);
            });

            chatbox.appendChild(optionsContainer);
        }

        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        console.error("Error fetching response:", error);
        let errorMessage = document.createElement("div");
        errorMessage.className = "bot-message";
        errorMessage.innerText = "Error: Unable to fetch response. Try again later.";
        chatbox.appendChild(errorMessage);
    }
}

async function getBotResponse(userInput) {
    const responses = {
        "how to use": {
            message: "📲 Here's how to use Awaaz360 effectively:\n\n" +
                     "1️⃣  Register/Login : Sign up as a villager or authority using your personal and location details.\n" +
                     "2️⃣  Report Issues : Villagers can upload problems (like crop burning, garbage dumping) with a description and image.\n" +
                     "3️⃣  Track Progress : View the status of your reports on your dashboard. If unresolved, it auto-escalates to higher authorities.\n" +
                     "4️⃣  Get Informed : Ask me about sustainable practices, recycling, and farming tips to help your community.\n" +
                     "5️⃣  Authority Actions : Admins can review, update, and resolve submitted issues with evidence-based responses.",
            options: ["How to Report Harmful Activities?", "Sustainability Education", "Agriculture Sustainability"]
        },

        "how to report harmful activities?": {
            message: "To report harmful activities such as crop burning, garbage mismanagement, or illegal dumping, you can use the Awaaz360 app. Simply submit a report with the details, and it will escalate if no action is taken by local authorities. You can report anonymously, ensuring your privacy and safety.\n\n" +
                     "Additionally, your report will be tracked to ensure accountability and faster action by the concerned authorities. Local villagers will also be alerted to take preventive measures.",
            options: ["Agriculture Sustainability", "Recycling Tips", "Sustainable Living"]
        },
        "hello": { 
            message: "Hello! 🌍 Welcome to Awaaz360. How can I assist you today? You can ask about topics like reporting harmful activities, agricultural practices, or sustainability tips.",
            options: ["How to report harmful activities?", "Agriculture Sustainability", "Recycling Tips", "Sustainability Education", "Crop Burning Awareness"]
        },

        "how to report harmful activities?": { 
            message: "To report harmful activities such as crop burning, garbage mismanagement, or illegal dumping, you can use the Awaaz360 app. Simply submit a report with the details, and it will escalate if no action is taken by local authorities. You can report anonymously, ensuring your privacy and safety.\n\n" +
                     "Additionally, your report will be tracked to ensure accountability and faster action by the concerned authorities. Local villagers will also be alerted to take preventive measures.",
            options: ["Agriculture Sustainability", "Recycling Tips", "Sustainable Living"]
        },

        "agriculture sustainability": { 
            message: "Agriculture sustainability is the practice of farming that meets current food needs without compromising the ability of future generations to do the same. Key practices include:\n\n" +
                     "🌾  Organic Farming : Use natural fertilizers and pest control methods, avoiding harmful chemicals that pollute the environment.\n" +
                     "💧  Efficient Irrigation : Techniques like drip irrigation help use less water while increasing crop yield.\n" +
                     "🌱  Crop Rotation & Diversification : Rotating crops annually helps maintain soil fertility and prevent pest buildup.\n" +
                     "🌍  Agroecology : This involves integrating ecological principles into farming, using natural biodiversity to improve yield and reduce environmental impact.",
            options: ["Soil Conservation", "Sustainable Farming Techniques", "Zero Waste Lifestyle"]
        },

        "soil conservation": {
            message: "Soil conservation helps preserve soil health and prevent degradation. Here are some methods:\n\n" +
                     "🌾  Cover Cropping : Planting cover crops like legumes can help improve soil structure, increase nitrogen levels, and prevent erosion.\n" +
                     "💧  Terracing & Contour Farming : Techniques that slow down water runoff, reducing soil erosion in hilly or sloped regions.\n" +
                     "🌱  No-Till Farming : This method reduces soil disruption, helps conserve moisture, and enhances organic matter in the soil.\n" +
                     "🌍  Composting : Adding organic matter back into the soil to improve fertility and structure while reducing the need for chemical fertilizers.",
            options: ["Sustainable Farming Techniques", "Composting", "Agriculture Sustainability"]
        },

        "sustainable farming techniques": { 
            message: "Sustainable farming techniques help farmers achieve better productivity while protecting the environment. Here’s a deeper look into some practices:\n\n" +
                     "1️⃣  Agroforestry : This technique integrates trees and shrubs into crop and livestock systems, benefiting both the environment and productivity.\n" +
                     "2️⃣  No-Till Farming : A method where farmers don’t disturb the soil, helping retain moisture and prevent erosion.\n" +
                     "3️⃣  Integrated Pest Management (IPM) : This approach uses a combination of biological, cultural, and mechanical pest control techniques rather than chemicals.\n" +
                     "4️⃣  Permaculture : A system of agricultural and social design that mimics the natural ecosystem, focusing on sustainable and self-sufficient farming.\n",
            options: ["Agriculture Sustainability", "Soil Conservation", "Composting"]
        },

        "crop burning": {
            message: "Crop burning is harmful to the environment and health. It leads to:\n\n" +
                     "🔥  Air Pollution : Burning crops releases harmful toxins and particulate matter into the air, leading to respiratory issues.\n" +
                     "🌍  Soil Degradation : It can degrade soil quality, reduce nutrients, and affect future crop yields.\n" +
                     "👩‍🌾  Health Risks : Smoke from crop burning can affect people’s health, leading to eye irritation, lung problems, and long-term diseases.\n\n" +
                     "Instead of burning crops, consider these alternatives:\n\n" +
                     "🌾  Composting : Use crop residues to create nutrient-rich compost for soil.\n" +
                     "🐄  Animal Feed : Crop residues can also be used as feed for livestock.\n" +
                     "🔄  Incorporating Crop Residue : Plowing the residue into the soil helps return organic matter and improves soil health.",
            options: ["Agriculture Sustainability", "Zero Waste Lifestyle", "Reporting Harmful Activities"]
        },

        "recycling tips": { 
            message: "♻️ Recycling helps reduce waste and conserve natural resources. Here are some essential tips to follow:\n\n" +
                     "1️⃣  Separate Waste : Sort your waste into categories like plastic, paper, metal, and glass to make recycling more efficient.\n" +
                     "2️⃣  Rinse Containers : Always rinse bottles and cans before recycling to prevent contamination.\n" +
                     "3️⃣  Avoid Contaminants : Do not recycle greasy pizza boxes or containers with food residue.\n" +
                     "4️⃣  Upcycling : Turn old items into something useful instead of throwing them away—create furniture from pallets or use old jars for storage!\n" +
                     "5️⃣  Reduce Single-Use Items : Avoid single-use plastics like straws and cutlery.",
            options: ["Composting", "Zero Waste Lifestyle", "Agriculture Sustainability"]
        },
        "composting": {
            message: "Composting is a great way to recycle organic waste and create nutrient-rich soil. Here’s how to start:\n\n" +
                     "1️⃣  Choose a Compost Bin : You can buy one or make your own using wood pallets or wire mesh.\n" +
                     "2️⃣  Add Organic Waste : Include fruit and vegetable scraps, coffee grounds, eggshells, grass clippings, and leaves.\n" +
                     "3️⃣  Avoid : Do not add meat, dairy, or oily foods as they can attract pests.\n" +
                     "4️⃣  Aerate the Pile : Turn the compost pile every few weeks to help it decompose faster.\n" +
                     "5️⃣  Use Finished Compost : After a few months, your compost will be ready to use in your garden!\n",
            options: ["Sustainable Living", "Zero Waste Lifestyle", "Agriculture Sustainability"]
        },
        "sustainable living": {
            message: "Sustainable living is about making choices that reduce your environmental impact. Here are some tips:\n\n" +
                     "🌱  Reduce Energy Use : Switch to energy-efficient appliances and turn off lights when not in use.\n" +
                     "🚶‍♂️  Use Public Transport : Walk, bike, or use public transport to reduce carbon emissions.\n" +
                     "🍽️  Eat Local : Support local farmers and reduce the carbon footprint associated with transporting food.\n" +
                     "💧  Conserve Water : Fix leaks, take shorter showers, and use water-saving fixtures.\n",
            options: ["Eco-Friendly Products", "Agriculture Sustainability", "Zero Waste Lifestyle"]
        },

        "sustainability education": { 
            message: "Education plays a key role in promoting sustainability. Here’s how you can contribute:\n\n" +
                     "📚  Teach the Next Generation : Schools and community programs should include topics like recycling, waste management, and energy conservation.\n" +
                     "🌍  Promote Awareness : Use social media to raise awareness about environmental issues and solutions.\n" +
                     "🤝  Community Outreach : Organize workshops and campaigns to teach people about sustainable practices.\n" +
                     "🔬  Stay Informed : Learn about the latest innovations in green technology, sustainable energy, and eco-friendly products.\n",
            options: ["Sustainable Living", "Agriculture Sustainability", "Zero Waste Lifestyle"]
        },

        "zero waste lifestyle": { 
            message: "A zero-waste lifestyle is about minimizing waste and living sustainably. Here’s how you can make a difference:\n\n" +
                     "🔄  Reduce : Cut down on items that generate waste. Buy in bulk, choose products with minimal packaging, and avoid single-use plastics.\n" +
                     "♻️  Reuse : Choose reusable bags, containers, and bottles. Repair items instead of discarding them.\n" +
                     "🌱  Recycle : Follow proper recycling practices to divert waste from landfills.\n" +
                     "💡  Compost : Compost your food scraps and yard waste to create nutrient-rich soil.\n",
            options: ["Composting", "Agriculture Sustainability", "Recycling Tips"]
        },

        "eco-friendly products": { 
            message: "Eco-friendly products help reduce environmental impact. Here are some items you can use to go green:\n\n" +
                     "✅  Bamboo Toothbrushes : A sustainable alternative to plastic toothbrushes.\n" +
                     "✅  Reusable Bags : Cloth bags instead of single-use plastic bags.\n" +
                     "✅  Solar-Powered Chargers : Use the sun’s energy to charge your devices.\n" +
                     "✅  LED Light Bulbs : Energy-efficient lighting that lasts longer.\n" +
                     "✅  Compostable Cutlery : Biodegradable alternatives to plastic utensils.\n",
            options: ["Where to Buy?", "More Product Ideas"]
        },

        "where to buy?": { 
            message: "You can buy eco-friendly products from various sources:\n\n" +
                     "1️⃣  Local Organic Markets : Support farmers who use sustainable farming practices.\n" +
                     "2️⃣  Zero-Waste Stores : Look for stores that specialize in bulk products and sustainable alternatives.\n" +
                     "3️⃣  Online Retailers : Many online platforms sell eco-friendly products, such as EarthHero, The Green Collective, and more.\n" +
                     "4️⃣  Sustainable Brands : Check out companies like Patagonia, Bombas, and Seventh Generation for eco-conscious products.\n",
            options: ["More Product Ideas", "Minimalist Lifestyle"]
        }
    };

    let lowerInput = userInput.toLowerCase();
    return responses[lowerInput] || { 
        message: "🌱 Welcome to Awaaz360! Ask me about sustainability, agriculture, or environmental reporting. How can I assist you today?", 
        options: ["How to report harmful activities?", "Agriculture Sustainability", "Recycling Tips", "Sustainability Education"]
    };
}
