import { dbConnection, closeConnection } from './config/mongoConnection.js';
import { parks } from './config/mongoCollections.js';
import * as usersData from './data/users.js';

// Create default admin account
const createAdminAccount = async () => {
    try {
        const adminEmail = 'admin@stevens.edu';
        const adminPassword = 'Admin123!@#'; // Strong password: uppercase, lowercase, number, special char
        
        // Check if admin already exists
        try {
            await usersData.getUserByEmailInternal(adminEmail);
            console.log('Admin account already exists, skipping creation');
        } catch (error) {
            // Admin doesn't exist, create it
            const admin = await usersData.createUser(
                'Admin',
                'User',
                adminEmail,
                adminPassword,
                null,
                null, 
                'admin' 
            );
            console.log(`Created admin account: ${admin.email}`);
            console.log(`Admin credentials - Email: ${adminEmail}, Password: ${adminPassword}`);
        }
    } catch (error) {
        console.error('Error creating admin account:', error.message);
    }
};

// Create test user accounts
const createTestUsers = async () => {
    const testUsers = [
        {
            firstName: 'Chenyu',
            lastName: 'Liu',
            email: 'chenyu.liu@stevens.edu',
            password: 'Test12345!',
            addressZip: '10001',
            addressCity: 'New York'
        },
        {
            firstName: 'Yunwei',
            lastName: 'Li',
            email: 'yunwei.li@stevens.edu',
            password: 'Test54321!',
            addressZip: '10002',
            addressCity: 'New York'
        }
    ];

    for (const userData of testUsers) {
        try {
            try {
                await usersData.getUserByEmailInternal(userData.email);
                console.log(`User ${userData.email} already exists, skipping creation`);
            } catch (error) {
                const user = await usersData.createUser(
                    userData.firstName,
                    userData.lastName,
                    userData.email,
                    userData.password,
                    userData.addressZip,
                    userData.addressCity,
                    'user'
                );
                console.log(`Created test user: ${user.email} (${user.first_name} ${user.last_name})`);
                console.log(`  Credentials - Email: ${userData.email}, Password: ${userData.password}`);
            }
        } catch (error) {
            console.error(`Error creating user ${userData.email}:`, error.message);
        }
    }
};

// Initialize database connection and create accounts
const db = await dbConnection();
await createAdminAccount();
await createTestUsers();

const parkData = [
  {
    "park_name": "Constance Baker Motley Recreation Center",
    "park_location": "M",
    "park_zip": [
      "10022"
    ],
    "description": "A sprawling urban oasis featuring winding walking paths, scenic lakes, and open meadows.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Strawberry Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bellevue South Park",
    "park_location": "M",
    "park_zip": [
      "10016"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arverne Playground",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "Features well-maintained sports fields, modern playgrounds, and dedicated picnic areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Thursby Basin Park",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "Provides stunning waterfront views, a paved promenade, and recreational boating opportunities.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tottenville Shore Park",
    "park_location": "R",
    "park_zip": [
      "10307"
    ],
    "description": "An elevated green space with innovative landscaping, public art, and unique city vistas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kingsbridge Heights Community Center",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "Includes a dedicated dog run, fitness equipment stations, and community garden plots.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "110th Street Block Association Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Annunciation Playground",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Chelsea Park",
    "park_location": "M",
    "park_zip": [
      "10001"
    ],
    "description": "Hosts seasonal activities, outdoor concerts, food festivals, and cultural events.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Margaret I. Carman Green - Weeping Beech",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "Designed with winding trails, rustic benches, and naturalistic landscaping for quiet contemplation.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Longfellow Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Galileo Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "MacArthur Playground",
    "park_location": "M",
    "park_zip": [
      "10017"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Washington Park",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kosciuszko Street Garden",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Features an outdoor amphitheater, chess tables, and ample space for community gatherings.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Allerton Playground",
    "park_location": "X",
    "park_zip": [
      "10469"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Snug Harbor Cultural Center",
    "park_location": "R",
    "park_zip": [
      "10301",
      "10310"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcy Green South",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Connects to extensive bike trails and serves as a gateway to broader greenway networks.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Behagen Playground",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Known for its vibrant seasonal displays, including tulip gardens or autumn foliage.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lost Battalion Hall Recreation Center",
    "park_location": "Q",
    "park_zip": [
      "11374"
    ],
    "description": "A spacious green escape in the heart of the urban landscape.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mahoney Playground",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Big Red Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Conference House Park",
    "park_location": "R",
    "park_zip": [
      "10307",
      "10309"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abe Stark Skating Rink",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "Includes a modern, accessible playground with safe, rubberized surfacing.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Steeplechase Park",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Riverside Park South",
    "park_location": "M",
    "park_zip": [
      "10019",
      "10023"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Reed's Basket Willow Swamp Park",
    "park_location": "R",
    "park_zip": [
      "10301",
      "10304"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lower East Side Ecology Center",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "First Street Garden",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bushwick Playground",
    "park_location": "B",
    "park_zip": [
      "11237"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marion Hopkinson Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lentol Garden",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "Includes outdoor fitness equipment stations for body-weight exercises.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jaime Campiz Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brighton Playground",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Concrete Plant Park",
    "park_location": "X",
    "park_zip": [
      "10459",
      "10472"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Francis Lewis Park",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "De Colores Community Yard and Cultural Center",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lemon Creek Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pier 107 CVII",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A network of gravel trails meanders through wooded thickets.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "River Garden",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "Features an outdoor amphitheater hosting free movie nights and performances.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Old Town Playground",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Martin Luther King Jr. Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Contains an educational \"nature discovery\" zone for children.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Highland Park Childrens Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides rental services for paddle boats on its small lake.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sperandeo Brothers Playground",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A meticulously landscaped garden with themed sections.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gerard P. Dugan Playground",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Botanic Garden",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "Offers guided nature walks and horticulture tours on weekends.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Heisser Triangle",
    "park_location": "B",
    "park_zip": [
      "11237"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Story Playground",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barrett Park",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "Contains a community garden where locals can rent planting plots.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Two Coves Community Garden",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Simeone Park",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A peaceful Japanese-inspired garden with a koi pond and raked gravel.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corona Taxpayers Association",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "Includes a challenging outdoor fitness circuit for all levels.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Secret Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lafayette Playground",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Andrews Grove",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground Ninety",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "Includes a small, free-to-use outdoor library or book exchange box.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Starr Playground",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "TLC Sculpture Park Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Georgia Ave Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Columbus Park",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mae Grant Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "Contains an innovative, nature-based playground with logs and boulders.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bayview Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Century Playground",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "Includes a state-of-the-art skate park with ramps and rails.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Boerum Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Offers seasonal ice-skating on a maintained outdoor rink.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Squibb Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Features a fragrant rose garden with dozens of varieties.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackie Robinson Playground",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nathan Straus Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bellaire Playground",
    "park_location": "Q",
    "park_zip": [
      "11427"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greencroft Playground",
    "park_location": "R",
    "park_zip": [
      "10308"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Louis Pasteur Park",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sports Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Latinos Unidos Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Northerleigh Park",
    "park_location": "R",
    "park_zip": [
      "10302"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Glen Oaks Oval",
    "park_location": "Q",
    "park_zip": [
      "11004"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vinegar Hill Community Garden",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides well-marked running trails with distance markers.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Patrick Van Doren Pocket Park",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A butterfly garden planted with specific nectar and host plants.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lanett Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Concerned Residents of Montauk Avenue",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Springfield Park North",
    "park_location": "Q",
    "park_zip": [
      "11413"
    ],
    "description": "Contains an outdoor museum with interpretive historical signs.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hollis Playground",
    "park_location": "Q",
    "park_zip": [
      "11412"
    ],
    "description": "Provides direct access to longer regional hiking and biking trails.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East Springfield Playground",
    "park_location": "Q",
    "park_zip": [
      "11411"
    ],
    "description": "A sensory garden designed with fragrant herbs and textured plants.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Owen F. Dolen Park",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "D'Emic Playground",
    "park_location": "B",
    "park_zip": [
      "11232"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Msgr. McGolrick Park",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Admiral Playground",
    "park_location": "Q",
    "park_zip": [
      "11363"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brower Park",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "400 Montauk Av Block Assn",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 53",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Colgate Close",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bradhurst Gardens Association",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "Offers beginner-friendly, flat trails for walking and mobility devices.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grove Hill Playground",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ten Eyck Houses Garden",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lt. Joseph Petrosino Park",
    "park_location": "B",
    "park_zip": [
      "11228"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Andrew Haswell Green Park",
    "park_location": "M",
    "park_zip": [
      "10022",
      "10065"
    ],
    "description": "Offers regular, volunteer-led park clean-up days.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Captain William Harry Thompson Playground",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wood Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A green roof demonstration site with educational panels.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Havemeyer Playground",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "Includes a \"fitness trail\" with instructional signs for exercises.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Franklin Triangle",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bill Bojangles Robinson Playground",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "138th St. Community Garden",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jane Street Garden",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "Contains a \"quiet garden\" dedicated to reflection and silence.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Junction Playground",
    "park_location": "Q",
    "park_zip": [
      "11372"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Powell Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A rain garden that manages stormwater runoff beautifully.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East River Esplanade",
    "park_location": "M",
    "park_zip": [
      "10016"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ferris Family Burial Plot",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Pearly Gates",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beaver Noll Park",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Valentino Pier",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "James Forten Playground",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "George Washington Carver Botanical Garden",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11373",
      "11379"
    ],
    "description": "Contains a publicly accessible rooftop garden section.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Zion Triangle",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lafayette Playground",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Includes a small, free outdoor gym with pull-up bars.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alben Square",
    "park_location": "B",
    "park_zip": [
      "11219"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ehrenreich-Austin Playground",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Veteran's Square",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "New Dorp Park",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "Provides ample, well-lit parking for visitors.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Howard Malls",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A night garden with plants that glow under UV lights.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sixteen Lindens Triangle",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corporal Frank F. Fagan Sq.",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Offers a \"tool library\" for community gardening.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bradys Pond Park",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walt Whitman Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cohn Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. George Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Poe Park",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "Offers workshops on composting and urban gardening.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Norelli-Hargreaves Memorial Triangle",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "Features a \"friendship garden\" where people can leave notes.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sobel Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "David J O'Connell Square",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "Includes a small, outdoor theater for puppet shows.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Levy Playground",
    "park_location": "R",
    "park_zip": [
      "10302"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ingram Woods",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A \"pocket park\" with clever, space-saving design.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fleetwood Triangle",
    "park_location": "Q",
    "park_zip": [
      "11374"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dunningham Triangle",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Offers a \"park passport\" stamping station.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Washington Hall Park",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rafferty Triangle",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Manor Park",
    "park_location": "R",
    "park_zip": [
      "10304",
      "10306"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Tryon Park",
    "park_location": "M",
    "park_zip": [
      "10040"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pueble Unido Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Cuevita Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "United Block Association Garden",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pleasant Park Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sam and Sadie Koenig Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides \"parking\" for scooters and e-bikes.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Our Little Green Acre/garden Eight",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackie Robinson Community Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "W 124th Street Community Garden",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Offers \"forest bathing\" guided sessions.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Humacao Community Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 76 Garden",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Provides \"outdoor office\" pods with power outlets.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Yu Suen Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peachtree Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "New 123rd St Block Association Garden",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Offers \"art loan\" program for outdoor displays.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Community Garden Association",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Features a \"perfume garden\" focusing on scents.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden Of Love",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Elizabeth Langley Memorial Garden",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "Includes a \"sundial garden\" telling time with plants.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "117th St Community Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Family Community Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A \"climate-resilient\" garden with drought-tolerant plants.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Generation X",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "William B. Washington Memorial Garden",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Liz Christy Garden",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Plaza Cultural",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Diamante Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Morris-Jumel Ecological Education Garden",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mobilization For Change",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Life Spire Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kenkeleba House Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "9th St Community Garden Park",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "W 104th Street Garden",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abyssinian Tot Lot",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Detective Omar Edwards Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Linden Sitting Area",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pleasant Village Community Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Unity Gardens",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gordon Triangle",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Old Croton Aqueduct Gatehouse",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Merchant's House Museum",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frank White Memorial Garden",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Miracle Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hell's Kitchen Park",
    "park_location": "M",
    "park_zip": [
      "10036"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dry Dock Playground",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides \"parking day\" spots transformed annually.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Jardin Del Paraiso Park",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A \"wind sculpture\" garden with kinetic art.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground Eighty Nine LXXXIX",
    "park_location": "M",
    "park_zip": [
      "10024"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem Rose Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West 111th St. People's Garden",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "CEP Community Garden",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Discovery Garden",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Louis Armstrong Community Center",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Santos White Garden",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jefferson Market Garden",
    "park_location": "M",
    "park_zip": [
      "10011"
    ],
    "description": "Features a \"global garden\" with plants from continents.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Parks Council Success Garden",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "132 St Block Association Park",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "6th St and Ave B Community Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sunshine Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A \"green gym\" using natural elements for exercise.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fishbridge Garden",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dr. Ronald E. McNair Playground",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Septuagesimo UNO",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eugene McCabe Field",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Collect Pond Park",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "A \"children's garden\" where kids can plant seeds.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 155 Playground",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "Includes a \"sound garden\" with musical instruments.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bloomingdale Playground",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "Offers \"parkrun\" free weekly 5k events.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corporal John A. Seravalli Playground",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Samuel Seabury Playground",
    "park_location": "M",
    "park_zip": [
      "10128"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Yellowstone Park",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Chelsea Recreation Center",
    "park_location": "M",
    "park_zip": [
      "10001"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McKinley Playground",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East River Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clement Clarke Moore Park",
    "park_location": "M",
    "park_zip": [
      "10011"
    ],
    "description": "Offers \"outdoor sleeping\" pods for naps.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bleecker Playground",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Penn South Playground",
    "park_location": "M",
    "park_zip": [
      "10001"
    ],
    "description": "Provides \"nature weaving\" frames with found materials.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. James Triangle",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Renaissance Playground",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sol Bloom Playground",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "Offers \"green roof\" tours explaining benefits.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Michael's Playground",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Steinway Playground",
    "park_location": "Q",
    "park_zip": [
      "11105"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Matthew P. Sapolin Playground",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Poor Richard's Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Henry M. Jackson Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A \"play trail\" with activities spaced along a path.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peter's Field",
    "park_location": "M",
    "park_zip": [
      "10010"
    ],
    "description": "Features a \"water-wise\" garden demonstration.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Augustus St. Gaudens Playground",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "Offers \"nighttime nature\" walks with red-light flashlights.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wagner Playground",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gene Gray Playground",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Centreville Playground",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Haggerty Park",
    "park_location": "Q",
    "park_zip": [
      "11423"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Real Good Playground",
    "park_location": "Q",
    "park_zip": [
      "11374"
    ],
    "description": "Offers \"wind chime\" garden for auditory delight.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Electric Playground",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ravenswood Playground",
    "park_location": "Q",
    "park_zip": [
      "11106"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mafera Park",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground Thirty Five XXXV",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "A \"puzzle garden\" with a maze-like hedge.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jacob's Ladder Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Chiarantano Playground",
    "park_location": "B",
    "park_zip": [
      "11203"
    ],
    "description": "Offers \"park stewardship\" badges for kids.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "DeSalvio Playground",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Howard Von Dohlen Playground",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Middle Village Playground",
    "park_location": "Q",
    "park_zip": [
      "11379"
    ],
    "description": "A \"haiku garden\" with short poems on plaques.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sol Lain Plgd",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Montbellier Park",
    "park_location": "Q",
    "park_zip": [
      "11413"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Josephine Caminiti Playground",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hoparkinson R&L Block Association Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maggie's Magic Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East Flatbush Children's Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tom McDonald Triangle",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lindower Park",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Features a \"time telling\" garden using shadow lengths.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cobble Hill Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Helen Marshall Playground",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Langston Hughes Playground",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Provides \"parking for strollers\" near playgrounds.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Nicholas Playground South",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A \"winter garden\" with interesting bark and structure.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Memorial Circle",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harmony Park",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "Offers \"nature journaling\" prompts and clipboards.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lott Park",
    "park_location": "B",
    "park_zip": [
      "11226"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maple Playground",
    "park_location": "Q",
    "park_zip": [
      "11355"
    ],
    "description": "A \"garden of the senses\" focusing on touch, smell, sound.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nathan Weidenbaum Playground",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Big Bush Playground",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Success Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jacob H. Schiff Playground",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gutenberg Playground",
    "park_location": "M",
    "park_zip": [
      "10019"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frederick Douglass Playground",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tecumseh Playground",
    "park_location": "M",
    "park_zip": [
      "10024"
    ],
    "description": "Provides \"park friend\" volunteer ambassador program.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Moore Playground",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frederick B. Judge Playground",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Daniel M. O'Connell Playground",
    "park_location": "Q",
    "park_zip": [
      "11412"
    ],
    "description": "Offers \"outdoor classroom\" space for school groups.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tudor Grove Playground",
    "park_location": "M",
    "park_zip": [
      "10017"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mary O'Connor Playground",
    "park_location": "M",
    "park_zip": [
      "10017"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Trygve Lie Plaza",
    "park_location": "M",
    "park_zip": [
      "10017"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Anibal Aviles Playground",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Booker T. Washington Playground",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Monsignor Kett Playground",
    "park_location": "M",
    "park_zip": [
      "10034"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alfred E. Smith Playground",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sheltering Arms Playground",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Contains a \"community quilt\" project displayed outdoors.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marx Brothers Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Southside Burial Ground",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brigadier General Charles Young Playground",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Samuel N. Bennerson 2nd Playground",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "Offers \"digital park guide\" downloadable as an app.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alice Kornegay Triangle",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground One Twenty Five CXXV",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Captain John McKenna, IV Park",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fresh Meadows Playground",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harding Park",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "Offers \"park history\" scavenger hunt.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Randall Playground",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Charlie's Place",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Public Place",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sankofa Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Underwood Park",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "Offers \"nature mandala\" creation area with natural items.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "American Heart",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Amboy Neighborhood Center",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "All People's Church of the Apostolic Faith Community Garden",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McCaffrey Playground",
    "park_location": "M",
    "park_zip": [
      "10036"
    ],
    "description": "Provides \"citizen park ranger\" program for teens.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Linden Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11228"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sarsfield Playground",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "700 Decatur St Block Association",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gethsemane Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Provides \"park etiquette\" signs in friendly language.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Washington Skate Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sgt. William Dougherty Playground",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peter Minuit Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "Offers \"park prescriptions\" partnered with local doctors.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vladeck Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "Features a \"zen garden\" for personal raking.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grace Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Blue Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hillside Dog Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides \"accessible potting table\" for gardeners.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dean Playground",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Volky Garden & Flowers",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "Features a \"park podcast\" recording stories from visitors.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tony Dapolito Recreation Center",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Glenwood Playground",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Contains a \"sensory trail\" barefoot section (optional).",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground 115",
    "park_location": "Q",
    "park_zip": [
      "11356"
    ],
    "description": "Provides \"park wedding\" photo permit information.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A \"moon garden\" with white and silver plants for night.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Raoul Wallenberg Forest",
    "park_location": "X",
    "park_zip": [
      "10471"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Terrace Playground",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 149 Artsy Bloom Community Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A \"park swap\" event for plants, books, and tools.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hull Street Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Summit Street Community Garden",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Backyard",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A \"park evolution\" display showing historical photos.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Amazing Garden",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Human Compass Garden",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "Offers \"nature-based therapy\" sessions.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "George Walker Jr. Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spring Creek Park",
    "park_location": "B",
    "park_zip": [
      "11239"
    ],
    "description": "Provides \"park sleepover\" event permits for groups.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Old Gravesend Cemetery",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hendrick I. Lott House",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lewis Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "Offers \"park birthday\" celebration for its founding.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hope Ballfield",
    "park_location": "B",
    "park_zip": [
      "11237"
    ],
    "description": "An urban meadow intentionally maintained for biodiversity and casual recreation.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Goodwin Gardens",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Features a gently sloping amphitheater lawn for outdoor performances and gatherings.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sunshine Community Garden",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Earth Spirit Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Includes a well-designed rain garden that beautifies while managing stormwater.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Project Roots",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Bears Carlton Ave Garden",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Umoja Garden",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Contains a network of informal dirt paths favored by trail runners.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Big Park",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spuyten Duyvil Playground",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "De Hostos Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "North Pacific Playground",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bergen Beach Playground",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Green Central Knoll",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lt. Federico Narvaez Tot Lot",
    "park_location": "B",
    "park_zip": [
      "11226"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mother Cabrini Park",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "Includes a \"sensory trail\" with plants chosen for touch and fragrance.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rapkin-Gayle Plaza",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Umma Park",
    "park_location": "B",
    "park_zip": [
      "11226"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bennett Park",
    "park_location": "M",
    "park_zip": [
      "10033"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gateway Triangle",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ten Eyck Plaza",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Thomas Boyland Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park mobile\" library cart on weekends.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Robert E. Venable Park",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "University Place",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Features a \"water playground\" with pumps, channels, and dams.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Friends Field",
    "park_location": "B",
    "park_zip": [
      "11230"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Woods Playground",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Houston Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Chester Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A \"green connector\" linking several neighborhoods via pedestrian paths.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Remsen Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "Features a \"four-season interest\" garden with year-round beauty.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eleanor Roosevelt Playground",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Offers \"adventure playground\" elements like loose parts and building materials.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Whalen Playground",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Edmonds Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "Provides a \"volunteer hub\" for park maintenance and events.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park Slope Playground",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A \"destination playground\" attracting families from across the region.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Curtis Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kosciuszko Pool",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Patchen Community Square Garden",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Provides a \"community shed\" storing shared garden tools.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A \"night-blooming garden\" with flowers that open after dusk.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Long Pond Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "Features a \"park puzzle\" – a large, permanent outdoor jigsaw or maze.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stroud Playground",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gardens Of Union",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carter G. Woodson Children's Park",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Provides a \"nature play\" area with stumps, boulders, and sand.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nehemiah Park",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Willoughby Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carver Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ericsson Playground",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Green Gems",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corona Golf Playground",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A \"demonstration forest\" showing sustainable forestry practices.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ethan Allen Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "100% Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "Offers \"outdoor escape room\" style puzzles for teams.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Preston Community Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Includes a \"scent trail\" for the visually impaired, with aromatic plants.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fermi Playground",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A \"reconciliation garden\" acknowledging indigenous history.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Targee Street Triangle",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "Features a \"park history walk\" with then-and-now photo stands.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Evergreen Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Offers a \"green screen\" wall for photographers and filmmakers.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hickman Playground",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Includes a \"community weighing scale\" for produce from the garden.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fish Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jacob Joffe Fields",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hattie Carthan Playground",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pulaski Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "Offers a \"seed dispersal\" demonstration garden.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Oxport Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Classon Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pratt Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "DiGilio Playground",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "Features a \"park-specific tree species\" collection.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rainbow Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Offers a \"biophilic design\" showcase integrating nature into built elements.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beach Channel Playground",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Berriman Playground",
    "park_location": "B",
    "park_zip": [
      "11239"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Shabazz Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Yak Playground",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "Features a \"park benchmark\" survey marker visible to the public.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tiger Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Offers \"nature bingo\" or scavenger hunt sheets at the entrance.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground 286",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "Includes a \"sensory deprivation garden\" focusing on a single sense intensely.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kennedy King Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Power Playground",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harry Maze Playground",
    "park_location": "B",
    "park_zip": [
      "11203"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Patrick O'Rourke Playground",
    "park_location": "B",
    "park_zip": [
      "11228"
    ],
    "description": "Offers a \"park podcast\" listening station with QR codes.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greene Playground",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Oracle Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Luna Playground",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A \"bluebird trail\" with monitored nesting boxes.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Benson Playground",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grady Playground",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "Offers a \"quiet snowshoe\" trail in winter.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Winthrop Playground",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Roebling Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Provides a \"park trading post\" for kids to swap natural treasures.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sumner Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A \"sensory integration\" playground designed for all abilities.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Potomac Playground",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Howard Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wingate Park",
    "park_location": "B",
    "park_zip": [
      "11203"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West Playground",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Mary's Park",
    "park_location": "X",
    "park_zip": [
      "10454",
      "10455"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Star Spangled Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "Features a \"park run club\" starting point.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rainbow Playground",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "Offers a \"nature craft area\" with supplied materials on weekends.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ranaqua Playground",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wilson Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "Provides a \"park hero\" award board for volunteers.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.O. Reinaldo Salgado Playground",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A \"dappled sunlight\" forest path with a high canopy.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rodney Playground Center",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dutch Kills Playground",
    "park_location": "Q",
    "park_zip": [
      "11106"
    ],
    "description": "Offers a \"park adoption\" program for flower beds.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Batey de Do帽a Provi Garden",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McDonald Playground",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Herman Dolgon Playground",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "A \"dry riverbed\" garden demonstrating xeriscaping.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tilden Playground",
    "park_location": "B",
    "park_zip": [
      "11203"
    ],
    "description": "Features a \"park time capsule\" to be opened on a future date.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abe Lebewohl Park",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nicholas Naquan Heyward Jr. Park",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seward Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "Provides a \"public magnifying glass\" on a post for inspecting nature.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Andrew's Playground",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A \"micro-forest\" planted using the Miyawaki method for dense growth.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sunners Playground",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Features a \"park echo point\" where a shout returns.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mellett Playground",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "Offers a \"historical reenactment\" green space on certain weekends.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hamilton Metz Field",
    "park_location": "B",
    "park_zip": [
      "11203"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Russell Pedersen Playground",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "Provides a \"park-specific bird checklist\" available online.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Continental Army Plaza",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Guardia Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Aesop Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "Offers a \"park pal\" program pairing volunteers with isolated seniors.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Queens Valley Playground",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jennie Jerome Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nostrand Playground",
    "park_location": "B",
    "park_zip": [
      "11210"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rochdale Park",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "Features a \"park phonograph\" (old-fashioned speaker) playing period music.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Police Officer Nicholas Demutiis Park",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Springfield Park",
    "park_location": "Q",
    "park_zip": [
      "11413"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "United Community Center Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park webcam\" broadcasting a live view online.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dimattina Playground",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pfc Norton Playground",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tottenville Pool",
    "park_location": "R",
    "park_zip": [
      "10307"
    ],
    "description": "Offers a \"park genealogy\" day tracing local family histories.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "CPL. Thompson Park",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sedgwick Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abe Lebewohl Triangle",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A \"water conservation\" garden using only collected rainwater.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bloomingdale Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "Features a \"park trading card\" series to collect.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Forest Grove",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcy Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Shore Country Club",
    "park_location": "R",
    "park_zip": [
      "10309",
      "10312"
    ],
    "description": "Provides a \"park-specific geocache\" with a logbook.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clearview's Tail",
    "park_location": "Q",
    "park_zip": [
      "11427"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dr. Green Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Little Claremont Playground",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Offers a \"park pen pal\" program for kids.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jardin De La Familia",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Edith Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "MacLaughlin Playground",
    "park_location": "X",
    "park_zip": [
      "10471"
    ],
    "description": "A \"pollinator pathway\" linking to other green spaces.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mosaic Success Garden",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Features a \"park memory project\" recording oral histories.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Christopher Park",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cooper Triangle",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gertrude Ederle Recreation Center",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "Provides a \"park-specific plant hardiness zone\" sign.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Van Cortlandt's Tail",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "Features a \"park trivia trail\" with questions on signs.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dante Park",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gasoline Alley",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fordham Landing Playground",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Provides a \"park timekeeper\" sundial or water clock.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Freedom Triangle",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A \"historic quarry\" turned into a garden feature.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Baisley Pond Park",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "Features a \"park etymology\" sign explaining the name's origin.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joe Holzka Community Garden",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nellie Bly Park",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides a \"park-specific soil type\" display.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Features a \"park code of conduct\" displayed positively.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Berry Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peace Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pierrepont Playground",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides a \"park-specific sunset\" viewing spot.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Thomas Greene Playground",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bedford Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Features a \"park mascot\" statue or figure.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jennifer's Playground",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lt. Lia Playground",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "Includes a \"public rain garden\" demonstration.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gorman Playground",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "Provides a \"park-specific star chart\" for night viewing.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West Farms Rapids",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fowler Square",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "Features a \"park gratitude\" board for visitors to post notes.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West Farms Soldiers Cemetery",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Montefiore Square",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broadway Malls",
    "park_location": "M",
    "park_zip": [
      "10023",
      "10024",
      "10025"
    ],
    "description": "Provides a \"park-specific bird migration\" map.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arden Woods",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Features a \"park wish fountain\" where coins go to improvements.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "North Rochdale Playground",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Willowbrook Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frank D. O'Connor Playground",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Provides a \"park-specific plant propagation\" area.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Straus Park",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Yankee Stadium Garages/Lots",
    "park_location": "X",
    "park_zip": [
      "10451",
      "10452"
    ],
    "description": "Features a \"park kindness rock\" garden.",
    "park_type": "Lot",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Shore Park and Parkway",
    "park_location": "B",
    "park_zip": [
      "11209",
      "11220"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marc And Jason's Playground",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "Provides a \"park-specific wildlife tracking\" station.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Albemarle Playground",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jesse Owens Playground",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Features a \"park inspiration\" quote engraved on a bench.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John Allen Payne Playground",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dongan Playground",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Central Parkway",
    "park_location": "Q",
    "park_zip": [
      "11004",
      "11005",
      "11362",
      "11364",
      "11367",
      "11423",
      "11426"
    ],
    "description": "Provides a \"park-specific erosion control\" demonstration.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brizzi Playground",
    "park_location": "B",
    "park_zip": [
      "11219"
    ],
    "description": "Features a \"park ambassador\" animal (like a resident owl or hawk).",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Davis Playground",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Markham Playground",
    "park_location": "R",
    "park_zip": [
      "10302"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jack Breininger Park",
    "park_location": "Q",
    "park_zip": [
      "11426"
    ],
    "description": "Provides a \"park-specific composting toilet\" demonstration.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fulton Park",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clawson Playground",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "Features a \"park dream board\" for future ideas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crispus Attucks Playground",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Atkins Gardeners",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rienzi Playground",
    "park_location": "X",
    "park_zip": [
      "10466"
    ],
    "description": "Provides a \"park-specific mycology\" (mushroom) guide.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gun Hill Playground",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Magenta Playground",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "Features a \"park poetry slam\" stage.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sean's Place",
    "park_location": "Q",
    "park_zip": [
      "11103"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Athens Square",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spirit Playground",
    "park_location": "Q",
    "park_zip": [
      "11106"
    ],
    "description": "Provides a \"park-specific geology\" cross-section model.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corlears Hook Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Cyclone",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "Features a \"park time travel\" theme with era-specific zones.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Academy Of Music",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "E.M.T. Christopher J. Prescott Playground",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Roy Wilkins Recreation Center",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "Provides a \"park-specific lichen\" study area.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Highland Park",
    "park_location": "B",
    "park_zip": [
      "11207",
      "11208",
      "11385"
    ],
    "description": "A \"historic toll house\" site at an old park entrance.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bailey Playground",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "Features a \"park story circle\" for sharing tales.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "DeLury Square",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vogue Garden",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Millbrook Playground",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "Provides a \"park-specific fern\" collection.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fisher Pool",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Macombs Dam Park",
    "park_location": "X",
    "park_zip": [
      "10451",
      "10452"
    ],
    "description": "Features a \"park gratitude tree\" for hanging thankful notes.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Underbridge Dog Run",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Asphalt Green",
    "park_location": "M",
    "park_zip": [
      "10128"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gustave Hartman Square",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides a \"park-specific moss\" garden.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hope Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "WNYC Transmitter Park",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "Features a \"park dream catcher\" weaving demonstration.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frank Golden Park",
    "park_location": "Q",
    "park_zip": [
      "11356"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcy Green North",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcy Green Center",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Provides a \"park-specific algae\" sample viewing station.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Commodore Barry Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A \"historic canal\" towpath now a trail.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Metropolitan Recreation Center",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Features a \"park kindness bench\" for making friends.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sorrentino Recreation Center",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seaside Playground",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walter Ward Playground",
    "park_location": "Q",
    "park_zip": [
      "11414"
    ],
    "description": "Provides a \"park-specific insect hotel\" for native bees and bugs.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mazzei Playground",
    "park_location": "X",
    "park_zip": [
      "10469"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bay Terrace Playground",
    "park_location": "Q",
    "park_zip": [
      "11360"
    ],
    "description": "Features a \"park wish list\" for donations and volunteering.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hart Playground",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "Offers a \"community hydroponics\" garden demonstration.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harold Schneiderman Playground",
    "park_location": "Q",
    "park_zip": [
      "11414"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Thomas Paine Park",
    "park_location": "M",
    "park_zip": [
      "10007"
    ],
    "description": "Provides a \"park-specific bat house\" colony.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rosemary's Playground",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Boston Garden",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "Features a \"park compliment chain\" where visitors add links.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "A.R.R.O.W. Field House",
    "park_location": "Q",
    "park_zip": [
      "11106"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Auburndale Playground",
    "park_location": "Q",
    "park_zip": [
      "11358"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Latimer Playground",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "Provides a \"park-specific owl nesting\" box program.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Conch Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bayside Playground",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "Features a \"park pay-it-forward\" board for good deeds.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Francis Lewis Playground",
    "park_location": "Q",
    "park_zip": [
      "11361"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ampere Playground",
    "park_location": "Q",
    "park_zip": [
      "11416"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground Sixty Two LXII",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "Provides a \"park-specific turtle basking\" logs.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Little Flower Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Willets Point Playground",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "Features a \"park memory lane\" with donated bricks.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Murray Hill Playground",
    "park_location": "Q",
    "park_zip": [
      "11355"
    ],
    "description": "Offers a \"community greywater\" recycling demo garden.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Horace Harding Playground",
    "park_location": "Q",
    "park_zip": [
      "11374"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Annadale Playground",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "Provides a \"park-specific frog pond\" with chorus in spring.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground Eighty LXXX",
    "park_location": "Q",
    "park_zip": [
      "11004"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tall Oak Playground",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "Features a \"park inspiration path\" with motivational stones.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joseph Austin Playground",
    "park_location": "Q",
    "park_zip": [
      "11432"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clintonville Playground",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grassmere Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Provides a \"park-specific salamander\" habitat under logs.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Russell Sage Playground",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Locust Manor Playground",
    "park_location": "Q",
    "park_zip": [
      "11413"
    ],
    "description": "Features a \"park dream mapping\" activity for visitors.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bellerose Playground",
    "park_location": "Q",
    "park_zip": [
      "11426"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Van Alst Playground",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vleigh Playground",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "Provides a \"park-specific newt\" breeding pond.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Prall Playground",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flushing Fields",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "Features a \"park goal-setting\" corner with reflection prompts.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Louis Cuvillier Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "ABC Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mathews-Palmer Playground",
    "park_location": "M",
    "park_zip": [
      "10036"
    ],
    "description": "Provides a \"park-specific crayfish\" stream.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bildersee Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harvard Playground",
    "park_location": "Q",
    "park_zip": [
      "11432"
    ],
    "description": "Features a \"park vision board\" for community aspirations.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sunrise Playground",
    "park_location": "Q",
    "park_zip": [
      "11422"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "White Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Honey Locust Park",
    "park_location": "M",
    "park_zip": [
      "10022"
    ],
    "description": "Provides a \"park-specific mussel\" bed in clean water.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sherman Creek",
    "park_location": "M",
    "park_zip": [
      "10040"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Prophecy Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Features a \"park affirmation walk\" with positive statements.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abib Newborn Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "F.A.R.R. Community Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Saul Weprin Playground",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "Provides a \"park-specific aquatic insect\" study stream.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hunter's Point South Park",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A \"historic tanning vats\" area now a sunken garden.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Oakland Gardens",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "Features a \"park mindfulness maze\" for walking meditation.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Detective William T. Gunn Playground",
    "park_location": "Q",
    "park_zip": [
      "11426",
      "11427"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Douglaston Park Golf Course",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marie Curie Playground",
    "park_location": "Q",
    "park_zip": [
      "11361"
    ],
    "description": "Provides a \"park-specific plankton\" viewing microscope.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hillside Playground",
    "park_location": "Q",
    "park_zip": [
      "11004"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Farm Playground",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "Features a \"park growth mindset\" garden with changing exhibits.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bowne Park",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Poppenhusen Playground",
    "park_location": "Q",
    "park_zip": [
      "11356"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Blue Heron Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Provides a \"park-specific microorganism\" pond dip station.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Richmond Parkway",
    "park_location": "R",
    "park_zip": [
      "10301",
      "10304",
      "10306",
      "10309",
      "10312",
      "10314"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Meredith Woods",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flatbush Malls",
    "park_location": "B",
    "park_zip": [
      "11210",
      "11230"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clason Point Park",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "Provides a \"park-specific tardigrade\" (water bear) search area.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hutchinson River Parkway",
    "park_location": "X",
    "park_zip": [
      "10461",
      "10462",
      "10465",
      "10469",
      "10475"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peters Field",
    "park_location": "Q",
    "park_zip": [
      "11423"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John V. Lindsay East River Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Callahan-Kelly Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park-specific nematode\" soil life exhibit.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alice Austen Park",
    "park_location": "R",
    "park_zip": [
      "10304",
      "10305"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Faber Pool and Park",
    "park_location": "R",
    "park_zip": [
      "10302"
    ],
    "description": "Features a \"park compassion bench\" for listening and sharing.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Captain Tilly Park",
    "park_location": "Q",
    "park_zip": [
      "11432"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stuyvesant Square",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Recreational Area",
    "park_location": "M",
    "park_zip": [
      "10031",
      "10032"
    ],
    "description": "Provides a \"park-specific protozoa\" drop of water viewing.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bayside Fields",
    "park_location": "Q",
    "park_zip": [
      "11360"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John J Carty Park",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "Features a \"park kindness postbox\" for sending notes to strangers.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mill Rock Park",
    "park_location": "M",
    "park_zip": [
      "10128"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bay Beach 84 Garden",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Red Hook Recreation Area",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "Provides a \"park-specific diatom\" (algae) fossil display.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kaiser Park",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A \"historic mica mine\" cut now a sparkling rock face.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Astoria Park",
    "park_location": "Q",
    "park_zip": [
      "11105"
    ],
    "description": "Features a \"park gratitude graffiti\" wall (washable).",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "MHBA Living Laboratory",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Offers a \"community green flash\" sunset watch if on coast.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mariners Marsh Park",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kissena Park",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "Provides a \"park-specific radiolarian\" (plankton) sculpture.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "James A. Bland Playground",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground Twenty One",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "Features a \"park hope seeds\" station where you can take a seed to plant.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ponderosa Garden",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stars Of Hope",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Manuel Plaza",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "Provides a \"park-specific foraminifera\" (shelled organism) sand display.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Mark's Block Association",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seasons of Vision",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Features a \"park courage corner\" with inspiring stories.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Howard Av Block Association",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "United Community Centers - E New York Farms Project",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Includes a \"public quantum entanglement\" metaphor garden.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Madison Community Greenthumb",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Provides a \"park-specific coccolithophore\" (algae) chalk model.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Victory Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Claremont Neighborhood Garden",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Features a \"park perseverance path\" with challenging terrain.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seton Park",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10471"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vernon Tandt Block Association",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Upon This Rock Comm Garden",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Provides a \"park-specific cyanobacteria\" stromatolite model.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. John Cantius Parish",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Shield Of Faith",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Features a \"park self-care sanctuary\" with calming activities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arrochar Playground",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rev. Dr. Maggie Howard Playground",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cleveland Street Vegetable Garden",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Provides a \"park-specific extremophile\" (life in extreme conditions) exhibit.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Oriental Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spencer St Block Association",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "Features a \"park emotional resilience\" garden with weathering themes.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Victory Garden's Group",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Madison Street Block Association",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Madison Square Garden Association",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Provides a \"park-specific lithotroph\" (rock-eating bacteria) display.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lincoln Rd Block Association",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sunset Park",
    "park_location": "B",
    "park_zip": [
      "11232"
    ],
    "description": "Features a \"park community cohesion\" gathering circle.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Midland Field",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Midland Playground",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lefferts Pl Block Association",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "Provides a \"park-specific methanogen\" (methane-producing microbe) info.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerry and The Senior Gents",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerome Gardens",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Features a \"park social connection\" promenade with conversation starters.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden of Plenty",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Offers a \"community celestial pole\" star trail photography spot.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sh'ma Yisrael",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hancock T and T",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "Provides a \"park-specific psychrophile\" (cold-loving organism) ice exhibit.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greene Av United Neighbors Association Inc",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Red Gate Garden",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "Features a \"park intergenerational\" play and learning area.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gregory's Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nehemiah Ten Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vernon New Harvest",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "Provides a \"park-specific thermophile\" (heat-loving organism) hot spring model.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "A Better Community Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Manley's Pl",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Features a \"park cultural exchange\" festival grounds.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clifton Pl Memorial Park and Garden",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clara's Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "New Vision Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park-specific halophile\" (salt-loving organism) salt crust display.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Silver Lake Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Causa Festival Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Features a \"park linguistic diversity\" sign with hello in many languages.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Good Shepherds Garden",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Escape To Nature",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Floral Vineyard",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park-specific acidophile\" (acid-loving organism) bog exhibit.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "First Quincy St Block Association",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Farmers Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Features a \"park musical roots\" area with instruments from local cultures.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Red Shed Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fantasy Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Includes a \"public quantum superposition\" metaphor in a garden path.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Elton St Block Association",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Provides a \"park-specific alkaliphile\" (alkaline-loving organism) soda lake model.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East End Community Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walt L Shemal Garden",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "Features a \"park culinary heritage\" garden with immigrant crops.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cooper St Block Buster Association",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ennis Playground",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maria Hernandez Park",
    "park_location": "B",
    "park_zip": [
      "11237"
    ],
    "description": "Provides a \"park-specific barophile\" (pressure-loving organism) deep-sea vent model.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kelly Park Playground",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kelly Park Playground",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "Features a \"park textile traditions\" weaving and dyeing demo garden.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.O. Serrano Playground",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "TRUCE Garden",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Louis C. Moser Playground",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "Provides a \"park-specific xerophile\" (dry-loving organism) desert display.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Torsney Playground",
    "park_location": "Q",
    "park_zip": [
      "11104"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Paul Raimonda Playground",
    "park_location": "Q",
    "park_zip": [
      "11105"
    ],
    "description": "Features a \"park folk medicine\" plant garden with traditional uses.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "William Sheridan Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cadman Plaza Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bill Brown Playground",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "Provides a \"park-specific oligotroph\" (nutrient-poor environment) organism display.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lion's Pride Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Taaffe Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "Features a \"park spiritual practices\" quiet groves for various faiths.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Martin Luther Playground",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lindsay Triangle",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Washington Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "Provides a \"park-specific copiotroph\" (nutrient-rich loving) organism display.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Berry Street Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Westbourne Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Features a \"park astronomical heritage\" of indigenous star stories.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brisas Del Caribe",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Astoria Health Playground",
    "park_location": "Q",
    "park_zip": [
      "11106"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "L/CPL Thomas P. Noonan Jr. Playground",
    "park_location": "Q",
    "park_zip": [
      "11104"
    ],
    "description": "Provides a \"park-specific symbiont\" (mutually beneficial organisms) display.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Benninger Playground",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park Of The Americas",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "Features a \"park maritime history\" garden with coastal plants.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rufus King Park",
    "park_location": "Q",
    "park_zip": [
      "11432"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seven Gables Playground",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Veterans Grove",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Provides a \"park-specific parasite\" (ecological role) controlled display.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fidelity Triangle",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Albert Capsouto Park",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "Features a \"park agricultural history\" with heirloom crop varieties.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garibaldi Playground",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hines Park",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dodger Playground",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "Provides a \"park-specific saprophyte\" (decomposer) log decomposition exhibit.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fairmount Playground",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A \"historic ventifact\" (wind-eroded rock) garden.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Features a \"park industrial heritage\" with plants that remediate soil.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Lawrence Triangle",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "Provides a \"park-specific mycorrhiza\" (fungus-plant partnership) root display.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Chief Dennis L. Devlin Park",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "Features a \"park labor history\" commemorative grove.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Virginia Playground",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beatty Plaza",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McKinley Square",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Provides a \"park-specific nitrogen fixer\" plant guild demonstration.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Model T Senior Citizen's Garden",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Freeman Triangle",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Features a \"park suffrage history\" commemorative bench and sign.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Mary's Park",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Graham Triangle",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Saratoga Park",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park-specific pioneer species\" in a succession plot.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clark Playground",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcus Garvey Square",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "Features a \"park civil rights history\" march route marker.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Private William Gray Playground",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Benjamin Gladstone Square",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Admiral Farragut Playground",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Provides a \"park-specific climax community\" mature forest example.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Railroad Park",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Features a \"park women's history\" trail with bios on plaques.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dawson Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Schomberg Academy Garden",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Provides a \"park-specific keystone species\" (like beaver or wolf) role explanation.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wright Brothers Playground",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "Features a \"park LGBTQ+ history\" commemorative rainbow garden.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Colucci Playground",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Boone Slope",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crotona Park",
    "park_location": "X",
    "park_zip": [
      "10456",
      "10457",
      "10460"
    ],
    "description": "Provides a \"park-specific indicator species\" for water/air quality.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Northern Playground",
    "park_location": "Q",
    "park_zip": [
      "11372"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Finca del Sur Community Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Features a \"park disability rights history\" accessible design showcase.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Virginia Park",
    "park_location": "X",
    "park_zip": [
      "10460",
      "10462"
    ],
    "description": "Offers a \"community green rim\" (sun flash) watch at sunrise/sunset.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rock Garden Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "Provides a \"park-specific umbrella species\" (protecting habitat helps others) info.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "A \"historic stone forest\" (pinnacle karst) mini-landscape.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Father Duffy Square",
    "park_location": "M",
    "park_zip": [
      "10036"
    ],
    "description": "Features a \"park immigrant history\" with plants from around the world.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Granja Farm OTF",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Franklin Memorial Garden",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Provides a \"park-specific flagship species\" (charismatic, like an eagle) conservation story.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Whitefish Triangle",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hull Triangle",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "Features a \"park native history\" with traditional ecological knowledge signs.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seton Falls Park",
    "park_location": "X",
    "park_zip": [
      "10466"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sergeant Collins Triangle",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pontiac Playground",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "Provides a \"park-specific endangered species\" habitat restoration area.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West Harlem Piers",
    "park_location": "M",
    "park_zip": [
      "10024",
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bicentennial Veterans Memorial Park",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "Features a \"park environmental justice\" history display.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cottages Hill New Brighton Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Howard Bennett Playground",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "Provides a \"park-specific invasive species\" removal education area.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Holcombe Rucker Park",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cherry Tree Park",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "Features a \"park peace history\" meditation garden.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Astoria Heights Playground",
    "park_location": "Q",
    "park_zip": [
      "11103"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jes Good Rewards Childeren's Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10472",
      "10473"
    ],
    "description": "Provides a \"park-specific reintroduced species\" success story.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sutton Parks",
    "park_location": "M",
    "park_zip": [
      "10022"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sutton Place Park",
    "park_location": "M",
    "park_zip": [
      "10022"
    ],
    "description": "Features a \"park labor union history\" picnic grove.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jones Woods Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "M",
    "park_zip": [
      "10128"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lozada Playground",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "Provides a \"park-specific species recovery\" plan information board.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bushman Steps",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sakura Park",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Features a \"park technological history\" with old park infrastructure displayed.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beach 59th St Playground",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Haven Avenue",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dubos Point Wildlife Sanctuary",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "Provides a \"park-specific genetic diversity\" seed bank display.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Allied Productions/Le Petit Versailles",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Luke J. Lang Square",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "Features a \"park public health history\" about parks as \"lungs of the city\".",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Evelina Antonetty Playground",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Technical Sergeant Thomas J. Davey Triangle",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Provides a \"park-specific phenological mismatch\" (climate change effect) study.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Saw Mill Playground",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "D'Onofrio Square",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "Features a \"park educational history\" as an outdoor classroom for decades.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gen. Douglas MacArthur Park",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Givans Creek Woods",
    "park_location": "X",
    "park_zip": [
      "10475"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Father Giorgio Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Provides a \"park-specific assisted migration\" (helping plants move north) trial.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Edenwald Playground",
    "park_location": "X",
    "park_zip": [
      "10466"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand St. Community Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Features a \"park philanthropic history\" donor recognition in subtle ways.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Waterfront Garden",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bushwick Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "Provides a \"park-specific ex-situ conservation\" (off-site breeding) info.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sitting Area",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "University Woods",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Features a \"park artistic history\" as a muse for local painters.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Brother Island",
    "park_location": "X",
    "park_zip": [
      "10021"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Prospect Cemetery",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crowley Playground",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Provides a \"park-specific in-situ conservation\" (on-site protection) example.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Burns Playground",
    "park_location": "X",
    "park_zip": [
      "10469"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eastchester Playground",
    "park_location": "X",
    "park_zip": [
      "10469"
    ],
    "description": "Features a \"park literary history\" with quotes from authors who visited.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Parkside Playground",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Minetta Triangle",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gwen Ifill Park",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "Provides a \"park-specific citizen science monitoring\" program.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Matthews Muliner Playground",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beach 9 Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Features a \"park cinematic history\" filming location signs.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brant Point Wildlife Sanctuary",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bennett Rest",
    "park_location": "M",
    "park_zip": [
      "10033",
      "10040"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hamilton Fish Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "Provides a \"park-specific biodiversity index\" calculated yearly.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "Features a \"park musical history\" with composers inspired by the setting.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McKenna Square",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hinton Park",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Provides a \"park-specific ecosystem services\" (like clean air) valuation display.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. John's Park",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Quick Brown Fox Triangle",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "Features a \"park theatrical history\" outdoor stage legacy.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sitting Area 127 CXXVII",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sitting Area",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "Provides a \"park-specific carbon sequestration\" estimate per tree.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park Slope",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Neighborhood Community Garden",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "Features a \"park dance history\" where forms like square dancing were held.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frontera Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Phil \"Scooter\" Rizzuto Park",
    "park_location": "Q",
    "park_zip": [
      "11419"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Moore Homestead Playground",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Provides a \"park-specific water filtration\" value of wetlands.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Locust Point Marina",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "11 BC Serenity Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Features a \"park fashion history\" as a promenade for showing off clothes.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Zimmerman Playground",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Children's Magical Garden",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Keap Fourth Community Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A green sanctuary designed to buffer urban noise with dense tree plantings.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Nicholas Miracle Garden",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Offers a \"loop trail\" precisely one mile in length for measured walks or runs.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Adam Yauch Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Includes a \"Four Freedoms\" themed garden promoting ideals of democracy.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Epiphany Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Feeding Tree",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Oko Farms Aquaponics Education Garden",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "100 Quincy Street Community Garden",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Oasis Garden",
    "park_location": "M",
    "park_zip": [
      "10019"
    ],
    "description": "Provides a \"nature art gallery\" where children's artwork is displayed on fences.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Little Green Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A \"successional forest\" area showing stages of growth from field to woods.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cough Triangle",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lieutenant John H. Martinson Playground",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Offers a \"silent auction\" of donated garden art to benefit park programs.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sumpter Community Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "811 Family and Friends Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Mark's Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "College Avenue Greenthumb",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Juniper Valley Park",
    "park_location": "Q",
    "park_zip": [
      "11379"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grover Cleveland Playground",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Whole Neighborhood Garden",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "Provides a \"park podcast studio\" booth for recording short audio stories.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Pacific Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Telephone Playground",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "Features a \"QR code trail\" linking to videos about local ecology and history.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rappaport Playground",
    "park_location": "B",
    "park_zip": [
      "11219"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kolbert Playground",
    "park_location": "B",
    "park_zip": [
      "11230"
    ],
    "description": "Includes a \"sensory modulation garden\" for visitors with autism or PTSD.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rolph Henry Playground",
    "park_location": "B",
    "park_zip": [
      "11226"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Banneker Playground",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A \"community soundmap\" project collecting audio recordings of the park.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sixteen Sycamores Playground",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gilbert Ramirez Park",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East New York Farms Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Colonel David Marcus Playground",
    "park_location": "B",
    "park_zip": [
      "11230"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Gallo Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A \"bioluminescent fungi\" trail marked for viewing on damp autumn nights.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Raymond Bush Playground",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "97th Street Block Association",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "George Eagle Carr Community Garden",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Welcome Home Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park-run\" finish line timer for the weekly free 5k event.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Melrose Commons Park",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Murray Playground",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "Offers a \"nature-based therapy\" program with certified practitioners.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flood Triangle",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "Provides a \"tool library shed\" for gardening, clean-ups, and repair projects.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sergeant Johnson Triangle",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lawrence Virgilio Playground",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Features a \"digital projection wall\" for evening outdoor movies and art.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ocean Breeze Park",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Leave it Better Kids' Garden",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ruppert Park",
    "park_location": "M",
    "park_zip": [
      "10128"
    ],
    "description": "Provides a \"weather-resistant journal\" on a chain for nature observations.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11219"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dome Playground",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ramon Aponte Park",
    "park_location": "M",
    "park_zip": [
      "10036"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ocean Hill Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Battery Park City",
    "park_location": "M",
    "park_zip": [
      "10280"
    ],
    "description": "Provides a \"park-specific geofilter\" for social media apps like Snapchat.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clinton Community Garden",
    "park_location": "M",
    "park_zip": [
      "10036"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Woodruff Playground",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Thomas J. Cuite Park",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Paerdegat Park",
    "park_location": "B",
    "park_zip": [
      "11203"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seeley Park",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "Provides a \"park-themed poetry contest\" with winning verses engraved in stone.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Admiral Triangle",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fresh Meadows Park",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Block Association #81",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hoover - Manton Playgrounds",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "Provides a \"park pen\" with free postcards and a mailbox for sending them.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sam Leggio Triangle",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "B.C.C.A. Mini-park and Garden",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Slope Park Playground",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maple Grove Park",
    "park_location": "Q",
    "park_zip": [
      "11415"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground One Forty",
    "park_location": "Q",
    "park_zip": [
      "11436"
    ],
    "description": "Provides a \"park time capsule\" with scheduled opening every 25 years.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Foch Sitting Area",
    "park_location": "Q",
    "park_zip": [
      "11436"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Norelli-Hargreaves Playground",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "Offers a \"nature weaving\" station with flexible willow branches.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corona Health Sanctuary",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joyce Kilmer Park",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Provides a \"park-specific bird song identifier\" via a button-activated audio panel.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Manuel De Dios Unanue Triangle",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Judge Angelo Graci Triangle",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "James Madison Plaza",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Railroad Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "Provides a \"park etiquette\" board game at the info center teaching rules playfully.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kimlau Square",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A \"scent garden for the visually impaired\" with braille labels and guide ropes.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Anchorage Plaza",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Features a \"community soup day\" where park-grown vegetables are made into soup.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sheridan Square Viewing Garden",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cambria Playground",
    "park_location": "Q",
    "park_zip": [
      "11411"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maurice A FitzGerald Playground",
    "park_location": "Q",
    "park_zip": [
      "11416"
    ],
    "description": "Provides a \"park-specific tree climbing\" area for supervised youth programs.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Judge Moses Weinstein Playground",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sheepshead Playground",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Duarte Square",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Woodtree Playground",
    "park_location": "Q",
    "park_zip": [
      "11105"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gladys Warren Triangle",
    "park_location": "Q",
    "park_zip": [
      "11412"
    ],
    "description": "Provides a \"park phenology wheel\" that visitors can turn to match the season.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lt. Frank McConnell Park",
    "park_location": "Q",
    "park_zip": [
      "11419"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Patricia A. Brackley Park",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carlos R. Lillo Park",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Locust Manor Civic Association",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "Provides a \"park-specific geocache\" that is officially maintained and stocked.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wegener Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11215",
      "11232"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harry Chapin Playground",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "North Shore Esplanade",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "Provides a \"park soundscape\" recording posted online weekly.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eight Oaks Triangle",
    "park_location": "Q",
    "park_zip": [
      "11415"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackson Mill Green",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Myrtle Avenue Clemens Triangle",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flushing Greens",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Veterans Plaza",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "Provides a \"park-specific lichen\" guide showing air quality indicators.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Laguardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Newtown Playground",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Galapo Playground",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ditmars Playground",
    "park_location": "Q",
    "park_zip": [
      "11105"
    ],
    "description": "Provides a \"park biodiversity audit\" results displayed on an interactive screen.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Freedom Square Playground",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barrier Playground",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Strippoli Square",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crosson Park",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crosson Green",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Provides a \"park-specific mycelium network\" model showing underground connections.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sherry Dog Run",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triangle 90",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Offers a \"nature printing\" workshop using leaves and ink.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "General Hart Playground",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John Hancock Playground",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "Provides a \"park canopy cover\" percentage displayed on a sign.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pigeon Paradise",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Proctor-Hopson Circle",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Decatur Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hollis Veterans Square",
    "park_location": "Q",
    "park_zip": [
      "11423"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Drumgoole Tot Lot",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Provides a \"park-specific aquifer recharge\" demonstration model.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ida Court",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mohegan Triangle",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bell Tower Park",
    "park_location": "X",
    "park_zip": [
      "10471"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lawrence Triangle",
    "park_location": "Q",
    "park_zip": [
      "11355"
    ],
    "description": "Provides a \"park carbon footprint\" calculator for events held there.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Litchhult Square",
    "park_location": "Q",
    "park_zip": [
      "11429"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harmony Triangle",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "Features a \"community \"gratitude gram\" postbox for thanking park staff.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Slope",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "One Room Schoolhouse Park",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "Provides a \"park-specific water strider\" habitat in a still pond corner.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park at Beach 108 Street",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11373",
      "11379"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Offers a \"nature bracelet\" making station with tape and found items.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sitting Area",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sohncke Square",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Provides a \"park night insect\" survey sheet and blacklight station.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Concerned Residents of Barbey Street",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lot",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Lot",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wolfe's Pond Park",
    "park_location": "R",
    "park_zip": [
      "10309",
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hoyt Playground",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Steinmann Triangle",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Provides a \"park-specific tardigrade\" (water bear) viewing via microscope.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sledge Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stockton Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lowry Triangle",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "Provides a \"park sound level meter\" showing real-time noise pollution.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hero Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gravesend Park",
    "park_location": "B",
    "park_zip": [
      "11204"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John Paul Jones Park",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Provides a \"park-specific plankton net\" for pond dipping.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bedford Green",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kaltenmeier Playground",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Devoe Park",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Offers a \"nature mandala\" creation area with loose natural materials.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fox Playground",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Includes a \"public leaf wetness sensor\" for gardeners.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "61 Franklin St Garden",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "Provides a \"park air quality index\" display linked to city monitors.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fidler-Wyckoff House Park",
    "park_location": "B",
    "park_zip": [
      "11203"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Liotti Ikefugi Playground",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bobbie Lewis Jr. Playground",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Greene Park",
    "park_location": "B",
    "park_zip": [
      "11201",
      "11205"
    ],
    "description": "Provides a \"park-specific ant farm\" observation nest.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Blueberry Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Westwood Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Keltch Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "De Matti Park",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Annadale Green",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Provides a \"park light pollution\" measurement and reduction initiative.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Throgs Neck Park",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Owl's Head Park",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Memorial Gore",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Great Kills Veterans Playground",
    "park_location": "R",
    "park_zip": [
      "10308"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Irving Square Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park-specific slime mold\" observation log.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tappen Park",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cypress Hills Playground",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Westerleigh Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Offers a \"nature ink\" making workshop using berries and soot.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sgt. Joyce Kilmer Square",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Christopher J. Igneri Playground",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Provides a \"park meteor shower\" viewing schedule and map.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Von Briesen Park",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harris Brothers Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beattie Square",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "176th Street Community Garden",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Detective Keith L Williams Park",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "Provides a \"park-specific gall\" (plant growth caused by insects) collection.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground Seventy Five",
    "park_location": "Q",
    "park_zip": [
      "11366"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "William Simmons Community Garden Club",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Johnny Hartman Square",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Castle Hill Playground",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hugh J. Grant Circle",
    "park_location": "X",
    "park_zip": [
      "10462",
      "10472"
    ],
    "description": "Provides a \"park twilight\" calculator for best photography times.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dr. Ronald McNair Park",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Veterans Triangle",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cuyler Gore Park",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cooper Park",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Provides a \"park-specific leaf miner\" insect trail observation.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sarah J.S. Tompkins Garnet Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Travis Triangle",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Perla Garden",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "Offers a \"nature alphabet\" hunt for kids finding shapes in nature.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Richmond Terrace Park",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Neighbors Of Vega Baja",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "Provides a \"park aurora borealis\" viewing forecast if geographically possible.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dias Y Flores",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gaeta Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bradhurst Ave Garden",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Caserta Playground",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Earth People",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides a \"park-specific plant guttation\" (water droplets) morning viewing area.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Hill Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Laredo Avenue Parcel",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Schneider Sampson Square",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Edgecombe Park",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sugar Hill Garden",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "Provides a \"park noctilucent cloud\" observation guide in summer.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Middleburgh Triangle",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Calvary Monument",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seagirt Ave Wetlands",
    "park_location": "Q",
    "park_zip": [
      "11559",
      "11691"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Edgemere Urban Renewal Park",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Provides a \"park-specific pollen\" microscope viewing station.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Campos Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Sol Brilliante Jr",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Catholic War Veterans Square",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "Offers a \"nature symmetry\" hunt for mirrored patterns in leaves and flowers.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Michel Triangle",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Provides a \"park green flash\" sunset viewing spot if on a western coast.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ruoff Triangle",
    "park_location": "Q",
    "park_zip": [
      "11416"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Steuben Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Father Reilly Square",
    "park_location": "Q",
    "park_zip": [
      "11428"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Metro Triangle",
    "park_location": "Q",
    "park_zip": [
      "11415"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barclay Triangle",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "Provides a \"park-specific resin\" collection from trees, with uses explained.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Drumm Triangle",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "6BC Botanical Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sterling Community Group",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Green Oasis and Gilbert's Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Firemen's Memorial Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides a \"park corona\" (halo around sun/moon) viewing guide.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "W 87th Street Garden",
    "park_location": "M",
    "park_zip": [
      "10024"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Collyer Brothers Park",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Detective Joseph Mayrose Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Meucci Triangle",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "Provides a \"park-specific honeydew\" (aphid secretion) observation on leaves.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lefferts Playground",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Glendale Veterans Triangle",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Trolley Car Triangle",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "Offers a \"nature tessellation\" search for repeating patterns.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John Vincent Daniels Jr. Square",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sylvan Grove Cemetery",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Provides a \"park glory\" (optical phenomenon) viewing from misty hills.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Clove Road Cemetery",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sergeant Colyer Square",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broad Channel Veteran's Park",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Reiff Playground",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Citizens For A Better Community",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "Provides a \"park-specific eriophyid mite\" gall observation on plants.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Richmond Terrace Cemetery",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Macri Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Aqueduct Walk",
    "park_location": "X",
    "park_zip": [
      "10453",
      "10468"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brookville Park",
    "park_location": "Q",
    "park_zip": [
      "11413",
      "11422"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Leonard Square",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "Provides a \"park Brocken spectre\" (shadow in mist) viewing possibility on hikes.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Studley Triangle",
    "park_location": "Q",
    "park_zip": [
      "11358"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Queens Village Veterans Plaza",
    "park_location": "Q",
    "park_zip": [
      "11429"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Classon Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Elizabeth Stroud Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park-specific sooty mold\" growing on honeydew, explained.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hoffman Park",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frank Principe Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Daniel Carter Beard Mall",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "Offers a \"nature fractal\" hunt for self-similar patterns.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Federalist Triangle",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Monsignor Raul Del Valle Square",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Provides a \"park Fata Morgana\" mirage explanation if near water or flatlands.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Legion Triangle",
    "park_location": "Q",
    "park_zip": [
      "11421"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mentone Playground",
    "park_location": "Q",
    "park_zip": [
      "11413"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sleight Family Graveyard",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Family Community Garden",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Includes a \"public green rim\" sunset phenomenon explanation.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eastern Parkway Coalition",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "Provides a \"park-specific witch's broom\" (dense plant growth) examples.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crystal Wells Block Association",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lincoln Terrace / Arthur S. Somers Park",
    "park_location": "B",
    "park_zip": [
      "11213",
      "11233"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bath Beach Park",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Linwood Playground",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Stirling Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides a \"park Novaya Zemlya effect\" (Arctic mirage) story sign.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Milestone Park",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sternberg Park",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lot",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Lot",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Weeksville Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "Provides a \"park-specific fairy ring\" (mushroom circle) location map.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Neponsit Mall",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Homecrest Playground",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "Offers a \"nature Fibonacci sequence\" hunt in sunflowers and pinecones.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garrison Park",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bryant Hill Garden",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "Provides a \"park hafgerdingar\" (Icelandic wave mirage) legend sign.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Heffernan Triangle",
    "park_location": "B",
    "park_zip": [
      "11219"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carolina Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McKenna Triangle",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Doughboy Park",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Provides a \"park-specific mycorrhizal network\" diagram using wires and lights.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "William F Moore Park",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bryant Triangle",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lyons Square Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park Avenue Malls",
    "park_location": "M",
    "park_zip": [
      "10016"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triangle Three Sixteen",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "Provides a \"park mock mirage\" (complex inferior mirage) explanation.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcus Garvey Tenant's Assoc. Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Green Valley Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Court Square Park",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lt. Clinton L .Whiting Square",
    "park_location": "Q",
    "park_zip": [
      "11421"
    ],
    "description": "Provides a \"park-specific slime flux\" (tree bacterial ooze) information.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bridge Playground",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vamos Sembrar",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Offers a \"nature golden ratio\" measuring activity with calipers.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground One Thirty Four CXXXIV",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Isle Of Meadows",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Provides a \"park green ray\" (rare sunset flash) legend and science sign.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Latham Park",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sobel Court Park",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kingdom Pond Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hybrid Oak Woods Park",
    "park_location": "R",
    "park_zip": [
      "10307"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground of the Americas",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "Provides a \"park-specific Dutch elm disease\" resistant tree planting program.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cedar Tree Garden",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Bears Rockwell Pl Garden",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "E 4th Street Garden",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ketchum Triangle",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McCarren Park",
    "park_location": "B",
    "park_zip": [
      "11211",
      "11222"
    ],
    "description": "Provides a \"park will-o'-the-wisp\" (swamp gas) folklore and science sign.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Staten Island Industrial Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Planeview Park",
    "park_location": "Q",
    "park_zip": [
      "10021"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Soundview Park",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lopez Playground",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "Provides a \"park-specific chestnut blight\" survivor tree grove.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Siedenburg Park",
    "park_location": "R",
    "park_zip": [
      "10308"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Evergreen Park",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pinocchio Playground",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "Offers a \"nature parabolic shape\" search in leaves and petals.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "225 Street Malls",
    "park_location": "Q",
    "park_zip": [
      "11413"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triangle",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Provides a \"park moonbow\" (lunar rainbow) viewing possibility on full moons.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hilltop Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Elton Playground",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Shiloh Garden",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eibs Pond Park",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerome-Glenmore Cornerstone Community Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park-specific sudden oak death\" monitoring and information.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Powell Street Livonia Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nakks Malls",
    "park_location": "Q",
    "park_zip": [
      "11429"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Huguenot Ponds Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Euclid Garden",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alameda Malls",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "Provides a \"park St. Elmo's fire\" (atmospheric plasma) folklore sign.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lyons Pool",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Poppa and Momma Jones Historical Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Allen Street Malls",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Battery Park City",
    "park_location": "M",
    "park_zip": [
      "10007",
      "10013",
      "10280"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East River Walk",
    "park_location": "M",
    "park_zip": [
      "10021",
      "10028",
      "10065",
      "10075"
    ],
    "description": "Provides a \"park-specific beech bark disease\" information and resistant strains.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seaside Wildlife Nature Park",
    "park_location": "R",
    "park_zip": [
      "10308"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Egbert Triangle",
    "park_location": "R",
    "park_zip": [
      "10302"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barone Triangle",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Offers a \"nature spiral phyllotaxis\" counting activity on pinecones.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Trust Triangle",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Provides a \"park earthquake lights\" (rare seismic phenomenon) information.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dahill Triangle",
    "park_location": "B",
    "park_zip": [
      "11204"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Petrosino Square",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Andries Playground",
    "park_location": "B",
    "park_zip": [
      "11210"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Van Voorhees Playground",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broad Channel Wetlands",
    "park_location": "Q",
    "park_zip": [
      "11693",
      "11693",
      "11693",
      "11693"
    ],
    "description": "Provides a \"park-specific emerald ash borer\" trap and monitoring display.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "O'Sullivan Plaza",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ferry Point Park",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Long Island Mews",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Challenge Playground",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "Provides a \"park ball lightning\" (rare atmospheric phenomenon) stories.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Emerald Playground",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11414"
    ],
    "description": "Features a \"community \"free gardening advice\" from master gardeners.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Riverdale Park",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10471"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gouverneur Morris Triangle",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Columbus Square",
    "park_location": "Q",
    "park_zip": [
      "11103"
    ],
    "description": "Provides a \"park-specific hemlock woolly adelgid\" biological control info.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hunts Point Riverside Park",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "Offers a \"nature Voronoi pattern\" search in mud cracks and giraffe spots.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Motor Parkway",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Noble Playground",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "Provides a \"park sprites\" (upper atmospheric lightning) information.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Watson Gleason Playground",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Louis Armstrong Playground",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tribeca Park",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nassau Mall South",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "Provides a \"park-specific gypsy moth\" population monitoring and management.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nassau Mall",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sunset Cove Park",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Willow Lake Playground",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gravesend Triangle",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "Provides a \"park earthquake cloud\" folklore and science discussion.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Idlewild Park",
    "park_location": "Q",
    "park_zip": [
      "11413",
      "11422"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dorothy K. McGowan Memorial Garden",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spargo  Park",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "Provides a \"park-specific Asian longhorned beetle\" detection and report info.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Remsen Family Cemetery",
    "park_location": "Q",
    "park_zip": [
      "11374"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11361"
    ],
    "description": "Offers a \"nature reaction-diffusion pattern\" search in animal coats.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vernon Mall",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Baybridge Green",
    "park_location": "Q",
    "park_zip": [
      "11360"
    ],
    "description": "Provides a \"park volcanic lightning\" phenomenon information.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clearview Park Golf Course",
    "park_location": "Q",
    "park_zip": [
      "11360"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pomonok Playground",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Young Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Travers Park",
    "park_location": "Q",
    "park_zip": [
      "11372"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hammel Playground",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "Provides a \"park-specific walnut twig beetle\" (thousand cankers disease) info.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bayview Terrace Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crocheron Park",
    "park_location": "Q",
    "park_zip": [
      "11361"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fiorello La Guardia Park",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Little Bay Park",
    "park_location": "Q",
    "park_zip": [
      "11359",
      "11360"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Olde Towne of Flushing Burial Ground",
    "park_location": "Q",
    "park_zip": [
      "11358"
    ],
    "description": "Provides a \"park heat lightning\" (distant silent lightning) explanation.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John E. White Park",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Schmul Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Veterans Park",
    "park_location": "R",
    "park_zip": [
      "10302"
    ],
    "description": "Offers a \"solar Parker spiral\" (magnetic field spiral) model.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bruckner Playground",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Powell's Cove Park",
    "park_location": "Q",
    "park_zip": [
      "11356",
      "11357"
    ],
    "description": "Provides a \"park-specific spotted lanternfly\" squishing station and reporting.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mall Eighteen",
    "park_location": "Q",
    "park_zip": [
      "11356"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "North Shore Esplanade",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11362"
    ],
    "description": "Offers a \"nature Turing pattern\" search in seashells and vegetation.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bell Malls",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "Includes a \"public green flash\" sunset phenomenon science.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mall Forty Two XLII",
    "park_location": "Q",
    "park_zip": [
      "11361"
    ],
    "description": "Provides a \"park clear air turbulence\" information for education.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "City Hall Park",
    "park_location": "M",
    "park_zip": [
      "10007"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barry Plaza",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Utopia Playground",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Plaut Triangle",
    "park_location": "Q",
    "park_zip": [
      "11358"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alexander Grey Triangle",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "Provides a \"park-specific boxwood blight\" prevention tips for gardeners.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Breukelen Ballfields",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lafayette Gardens Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Raymond O鈥機onnor Park",
    "park_location": "Q",
    "park_zip": [
      "11361"
    ],
    "description": "Offers a \"pop-up zoetrope\" animation screening of nature scenes.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Poppenhusen Park",
    "park_location": "Q",
    "park_zip": [
      "11356"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Morningside Park",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "Provides a \"park thundersnow\" (snow thunderstorm) phenomenon information.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corporal Ruoff Square",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corona Plaza",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Beach Wetlands",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spring Creek Park",
    "park_location": "B",
    "park_zip": [
      "11208",
      "11239",
      "11414"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Canarsie Park",
    "park_location": "B",
    "park_zip": [
      "11236",
      "11239"
    ],
    "description": "Provides a \"park-specific rose rosette disease\" resistant variety planting.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bowling Green",
    "park_location": "M",
    "park_zip": [
      "10004"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Miele Park",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "City Line Park",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Offers a \"nature labyrinth\" walking meditation based on geometric patterns.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bridge Park",
    "park_location": "X",
    "park_zip": [
      "10452",
      "10453"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground 103 CIII",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "Provides a \"park derecho\" (widespread windstorm) preparedness info.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Synergi Urban Garden UCFP",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Features a \"community \"free film screening\" of nature documentaries.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triboro Plaza",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Howard Pool",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brevoort Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park-specific peach tree borer\" management for community orchards.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frost Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Van Dyke Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Last Chance Pond Park",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sabba Park",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "Provides a \"park haboob\" (dust storm) phenomenon information if in arid region.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Laurelton Playground",
    "park_location": "Q",
    "park_zip": [
      "11422"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bensonhurst Park",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ashmead Park",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Quaker Parrot Park at the Dust Bowl",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vinmont Veteran Park",
    "park_location": "X",
    "park_zip": [
      "10471"
    ],
    "description": "Provides a \"park-specific apple scab\" resistant tree varieties list.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carlton Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Totten Park",
    "park_location": "Q",
    "park_zip": [
      "11359"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hart Island",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "Offers a \"nature cryptographic pattern\" search in butterfly wings.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Laurelton Community Garden of Resilience",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seth Low Playground/ Bealin Square",
    "park_location": "B",
    "park_zip": [
      "11204"
    ],
    "description": "Provides a \"park microburst\" (localized downdraft) safety information.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Four Sparrow Marsh",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tilyou Playground",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Heritage Park",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broad Channel Park",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "O'Brien Oval",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Provides a \"park-specific grape phylloxera\" history and grafting solution.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harding Park Beautification Project",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Freeman Garden",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 29 Ballfield",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Offers a \"pop-up camera lucida\" drawing aid for nature sketching.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Diversity Edible Farm",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "Provides a \"park steam devil\" (whirlwind over warm water) phenomenon info.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Family Group Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Culinary Kids Garden",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mission Garden",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brownsville Green",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Includes a \"public green rim\" sunset science.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flatbush African Burial Ground",
    "park_location": "B",
    "park_zip": [
      "11226"
    ],
    "description": "Provides a \"park-specific citrus greening\" disease research update.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Todd Triangle",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hunts Point Playground",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bowne Playground",
    "park_location": "Q",
    "park_zip": [
      "11355"
    ],
    "description": "Offers a \"nature camouflage pattern\" search for insects and animals.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides a \"park ball lightning\" theories and documented cases.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vincent F. Albano Jr. Playground",
    "park_location": "M",
    "park_zip": [
      "10016"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Percy E. Sutton Playground",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11414"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Susan Smith McKinney Steward Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hackett Park",
    "park_location": "X",
    "park_zip": [
      "10471"
    ],
    "description": "Provides a \"park-specific plum pox virus\" management information.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kissena Corridor Park",
    "park_location": "Q",
    "park_zip": [
      "11355"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joseph Daniel Wilson Garden",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Casita Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Offers a \"pop-up magic lantern\" (early projector) show of nature slides.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "First Temple Of David",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. James Park",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Provides a \"park St. Elmo's fire\" scientific explanation.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flower Door Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lt. Michael R. Davidson Playground",
    "park_location": "Q",
    "park_zip": [
      "11377"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marconi Park",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Woodside Houses Park",
    "park_location": "Q",
    "park_zip": [
      "11103"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park Avenue Malls",
    "park_location": "M",
    "park_zip": [
      "10017",
      "10022"
    ],
    "description": "Provides a \"park-specific fire blight\" management for pear and apple trees.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brinkerhoff Cemetery",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Villa Santruce",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Offers a \"nature warning coloration\" search for insects and animals.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Estella Diggs Park",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Provides a \"park earthquake lights\" possible causes discussion.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Nicholas - Powers St. Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Nicholas - Olive St. Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lot",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Lot",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flight 587 Memorial Park",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greenbelt Native Plant Center",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Provides a \"park-specific Dutch elm disease\" resistant hybrid elm grove.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Damrosch Park",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lorraine Hansberry Plaza",
    "park_location": "M",
    "park_zip": [
      "10036"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Offers a \"pop-up shadow puppet\" theater of nature stories.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fruit Street Sitting Area",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides a \"park sprites\" and jets (upper atmospheric lightning) science.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem Grown",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tiffany Street Pier",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maple Street Community Garden",
    "park_location": "B",
    "park_zip": [
      "11225"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Legacy Park",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bed-Stuy Farm",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park-specific chestnut blight\" backcross breeding program info.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Betty Carter Park",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "Q",
    "park_zip": [
      "11412"
    ],
    "description": "Offers a \"nature mimicry\" search for look-alike insects and plants.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greenpoint Public Park",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Captain Dermody Triangle",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "Provides a \"park volcanic lightning\" science explanation.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10468"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fairview Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lincoln Center Plaza",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Prospect Plaza Park",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Moffat Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Offers a \"nature 'aposematism' search for warning signals in flora/fauna.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "NYC AIDS Memorial Park at St. Vincent鈥檚 Triangle",
    "park_location": "M",
    "park_zip": [
      "10011"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "BSCAH Urban Farm",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park-specific 'emerald ash borer' biological control release site.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pagan's Garden",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Audubon Playground",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McKee Triangle",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Holy Cow Playground",
    "park_location": "Q",
    "park_zip": [
      "11365"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Saratoga Blake Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Provides a \"park-specific 'hemlock woolly adelgid' predator introduction program.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Queens Farm Park",
    "park_location": "Q",
    "park_zip": [
      "11426"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerome Playground South",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Castlewood Playground",
    "park_location": "Q",
    "park_zip": [
      "11426"
    ],
    "description": "Offers a \"nature 'Batesian mimicry' hunt for harmless impostors.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Garden",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tranquility Farm",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "Provides a \"park 'sprites & elves' (upper atmospheric lightning) observation station.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Halsey Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Halsey and Ralph Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hattie Carthan Herb Farm",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "E. 43 St. Block Assoc. Garden",
    "park_location": "B",
    "park_zip": [
      "11210"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "Q",
    "park_zip": [
      "11436"
    ],
    "description": "Provides a \"park-specific 'gypsy moth' pheromone trap monitoring display.\"",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rev. Linnette C Williamson Memorial Park",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "President Street Garden",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Edgemere Coalition",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Offers a \"nature 'M眉llerian mimicry' search for mutually protected species.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Box Street Park",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cypress Hills Change Garden",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Provides a \"park 'heat lightning' vs. 'regular lightning' educational comparison.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Libertad Urban Farm",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Her-King Alagantic Garden",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arlington Marsh Park",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Siempre Verde Garden",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem Valley Garden",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "Provides a \"park-specific 'spotted lanternfly' biological control research plot.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Henry Garnet Garden",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "W. 111th St. Harlem Garden",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brownsville Community Farm",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Offers a \"nature 'aggressive mimicry' hunt for predator deceivers.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Isabahlia Community Garden",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Provides a \"park 'thundersnow' rare audio recording playback station.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Positive Seeds of Life Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Surfside Multi-Cultural Garden Coalition",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Warwick Street Greenery Glow Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cutinella Triangle",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flatbush Mall",
    "park_location": "B",
    "park_zip": [
      "11230"
    ],
    "description": "Provides a \"park-specific 'boxwood blight' resistant cultivar trial garden.\"",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "North Brother Island",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Java Garden",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Imani II Garden",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "Offers a \"nature 'automimicry' search (self-mimicry within one organism).\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Neptune Playground",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "Provides a \"park 'derecho' windstorm damage recovery timeline exhibit.\"",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stebbins Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "FDNY-EMT Yadira Arroyo Playground",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mosholu Playground",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Taylor Playground",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "Provides a \"park-specific 'peach tree borer' trap cropping demonstration.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Riverbend Playground",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10468"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ashford Street Abundant Garden",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hilton White Playground",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Offers a \"nature 'Vavilovian mimicry' (weed妯′豢 crop) agricultural display.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Naples Playground",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Havemeyer Garden",
    "park_location": "X",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park 'haboob' dust storm safety preparedness guide.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cedar Grove Playground",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Delphin H. Greene Playground",
    "park_location": "Q",
    "park_zip": [
      "11411"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mapes Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rose Hill Park",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Painter's Playground",
    "park_location": "Q",
    "park_zip": [
      "11374"
    ],
    "description": "Provides a \"park-specific 'apple scab' integrated pest management chart.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Happy Warrior Playground",
    "park_location": "M",
    "park_zip": [
      "10025"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ten Eyck Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Osborn Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Offers a \"nature 'Wasmannian mimicry' (ant-mimicking beetles) display.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bath Playground",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Student Farm Project",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Provides a \"park 'microburst' wind damage pattern recognition guide.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Golconda Playground",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pirates Cove Garden",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Brooklyn Children's Garden",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vernon/Throop Ave Block Association",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Centro Cultural Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Provides a \"park-specific 'grape phylloxera' historical impact vineyard.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Chelsea Green",
    "park_location": "M",
    "park_zip": [
      "10011"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walter Gladwin Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Features a \"community 'free dementia-friendly' nature engagement program.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arbutus Woods Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Offers a \"nature 'Peckhamian mimicry' (aggressive mimicry in predators) hunt.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cardozo Playground",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bunker Ponds Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Provides a \"park 'steam devil' formation conditions and safety.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "King Fisher Park",
    "park_location": "R",
    "park_zip": [
      "10308"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bathgate Playground",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 279 Playground",
    "park_location": "B",
    "park_zip": [
      "11236"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Catherine Scott Promenade",
    "park_location": "X",
    "park_zip": [
      "10464"
    ],
    "description": "Includes a \"public 'green rim' vs. 'green flash' differentiation guide.\"",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Angie Lee Gonzales Garden",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "Provides a \"park-specific 'citrus greening' detection dog program info.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Patterson Playground",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Magic Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "Offers a \"nature 'Gilbertian mimicry' (female-limited polymorphism) display.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "\"Uncle\" Vito F. Maranzano Glendale Playground",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Briarwood Playground",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "Provides a \"park 'ball lightning' eyewitness account archive.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jamaica Playground",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Colden Playground",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pier 42",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Al Stabile Playground",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wayanda Park",
    "park_location": "Q",
    "park_zip": [
      "11429"
    ],
    "description": "Provides a \"park-specific 'plum pox virus' resistant rootstock trials.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Equity Playground",
    "park_location": "Q",
    "park_zip": [
      "11421"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bartlett Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barnhill Square",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Offers a \"nature 'Emsleyan/Mertensian mimicry' (deadly model) display.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Surf Playground",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Newport Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Provides a \"park 'St. Elmo's fire' on aircraft modern occurrence info.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cornell Burial Ground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Cemetery",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Space Time Playground",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brinkerhoff Mall",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Belmont Playground",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "Provides a \"park-specific 'fire blight' prediction model using weather data.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Gregory's Playground",
    "park_location": "M",
    "park_zip": [
      "10024"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bella Abzug Park",
    "park_location": "M",
    "park_zip": [
      "10001",
      "10018"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pena Herrera Playground",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "Offers a \"nature 'protective mimicry' (crypsis & masquerade) scavenger hunt.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Louis Pl Friends",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harvey Park",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "Provides a \"park 'earthquake lights' competing theories comparison.\"",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Battery",
    "park_location": "M",
    "park_zip": [
      "10004",
      "10280"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Livonia Park",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Duke Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flynn Playground",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hawkins Park",
    "park_location": "X",
    "park_zip": [
      "10464"
    ],
    "description": "Provides a \"park-specific 'Dutch elm disease' vector beetle lifecycle display.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Haviland Playground",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden Of Happiness",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rev. T. Wendell Foster Park and Recreation Center",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Offers a \"nature 'startle display' (deimatic behavior) demonstration area.\"",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kwame Ture Recreation Center",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Madison Square Park",
    "park_location": "M",
    "park_zip": [
      "10010"
    ],
    "description": "Provides a \"park 'sprites & jets' high-speed camera footage.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "O'Neill Triangle",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rocket Playground",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wakefield Playground",
    "park_location": "X",
    "park_zip": [
      "10470"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Beach",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "Provides a \"park-specific 'chestnut blight' hypovirulence research update.\"",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Roosevelt Triangle",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gateway Park",
    "park_location": "Q",
    "park_zip": [
      "11435"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Glenwood Landing",
    "park_location": "Q",
    "park_zip": [
      "11363"
    ],
    "description": "Offers a \"nature 'eyespot mimicry' (false eyes) search on insects/wings.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pulaski Park",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "LaGuardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "Provides a \"park 'volcanic lightning' in recent eruptions footage.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Notorious LIC Park",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McLaughlin Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Schiff Mall",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tompkinsville Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lower East Side Playground",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides a \"park-specific 'beech bark disease' scale insect life cycle.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pleasant Plains Plaza",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden Of Life",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peaceful Valley Garden",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "Offers a \"nature 'behavioral mimicry' (e.g., mimicking leaves moving) observation.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tepper Triangle",
    "park_location": "Q",
    "park_zip": [
      "11432"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hermon A. MacNeil Park",
    "park_location": "Q",
    "park_zip": [
      "11356"
    ],
    "description": "Provides a \"park 'thundersnow' formation physics explanation.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Granite St Block Association",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hansborough Recreation Center",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gouverneur Playground",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Samuel Goldberg Triangle",
    "park_location": "B",
    "park_zip": [
      "11204"
    ],
    "description": "Provides a \"park-specific 'rose rosette disease' mite vector control.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gonzalo Plasencia Playground",
    "park_location": "B",
    "park_zip": [
      "11232"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bryant Park",
    "park_location": "M",
    "park_zip": [
      "10018"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lewis H Latimer House",
    "park_location": "Q",
    "park_zip": [
      "11354"
    ],
    "description": "Offers a \"nature 'acoustic mimicry' (e.g., burrowing owl mimicking rattlesnake).\"",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Staats Circle",
    "park_location": "R",
    "park_zip": [
      "10305"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barrett Triangle",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "Provides a \"park 'derecho' climatology and frequency increase data.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Claremont Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Army Plaza",
    "park_location": "M",
    "park_zip": [
      "10019"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greenwood Playground",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pelham Bay Little League",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mount Eden Malls",
    "park_location": "X",
    "park_zip": [
      "10452",
      "10457"
    ],
    "description": "Provides a \"park-specific 'peach tree borer' mating disruption dispenser demo.\"",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bill Rainey Park",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nautilus Playground",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "Offers a \"nature 'chemical mimicry' (e.g., orchid mimicking bee pheromone).\"",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hattie Carthan Community Garden",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Yolanda Garc铆a Park",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Provides a \"park 'haboob' safety: 'pull aside, stay alive' signage.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Van Cortlandt Park",
    "park_location": "X",
    "park_zip": [
      "10467",
      "10470",
      "10471",
      "10705",
      "10705"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Herbert Von King Park",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Queen Elizabeth II September 11th Garden",
    "park_location": "M",
    "park_zip": [
      "10005"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem River Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "Provides a \"park-specific 'apple scab' forecast model using leaf wetness.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem River Park",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walton Slope",
    "park_location": "X",
    "park_zip": [
      "10453",
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "University Malls",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "Offers a \"nature 'Owenian mimicry' (eggs mimicking objects) display.\"",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wagner Houses Pool",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Provides a \"park 'microburst' detection via weather radar education.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Givan Square",
    "park_location": "X",
    "park_zip": [
      "10469"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maritcha R. Lyons Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crotona Parkway Malls",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tiffany Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerome Slope",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Provides a \"park-specific 'grape phylloxera' genetic resistance breeding.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Machate Circle",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Corporal Wiltshire Square",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Graniteville Quarry Park",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "Offers a \"nature 'protective resemblance' (e.g., stick insect) hunt.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Blake Hobbs Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tribute Park",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "Provides a \"park 'steam devil' vs. 'dust devil' comparison.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beach Channel Park",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Major Mark Park",
    "park_location": "Q",
    "park_zip": [
      "11432"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lt. Wm. Tighe Triangle",
    "park_location": "M",
    "park_zip": [
      "10034"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "City Island Wetlands",
    "park_location": "X",
    "park_zip": [
      "10464"
    ],
    "description": "Includes a \"public 'green rim' observation log for citizen scientists.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Major General John R Brown Triangle",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "Provides a \"park-specific 'citrus greening' thermal therapy trials.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Woodrow Wilson Triangle",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Samuel Marx Triangle",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Father Fagan Park",
    "park_location": "M",
    "park_zip": [
      "10012",
      "10013"
    ],
    "description": "Offers a \"nature 'aggressive resemblance' (predator looking like prey) hunt.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Martin Luther King Triangle",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ryan Triangle",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Provides a \"park 'ball lightning' laboratory attempts replication info.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Echo Triangle",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Church Triangle",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alley Park",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pat Williams Playground",
    "park_location": "Q",
    "park_zip": [
      "11429"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hempstead Bench Spread",
    "park_location": "Q",
    "park_zip": [
      "11429"
    ],
    "description": "Provides a \"park-specific 'plum pox virus' economic impact exhibit.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jacob Riis Triangle",
    "park_location": "Q",
    "park_zip": [
      "11418"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bartel-Pritchard Square",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lady Moody Triangle",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "Offers a \"nature 'Batesian mimicry spectrum' (perfect to imperfect) examples.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Hamilton Triangle",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Margrichante Garden",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "Provides a \"park 'St. Elmo's fire' on natural objects (trees, grass) info.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wald Playground",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Playground One",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abraham Lincoln Playground",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Police Officer Edward Byrne Park",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Washington Square Park",
    "park_location": "M",
    "park_zip": [
      "10011"
    ],
    "description": "Provides a \"park-specific 'fire blight' resistant apple varieties orchard.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mercer Playground",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Avenue R Mall",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "Offers a \"nature 'M眉llerian mimicry ring' complex example display.\"",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barretto Point Park",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem River Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "Provides a \"park 'earthquake lights' eyewitness sketch collection.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crack Is Wack Playground",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sitting Area",
    "park_location": "B",
    "park_zip": [
      "11218"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arbor Place",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem Art Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sage Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides a \"park-specific 'Dutch elm disease' fungicide injection demo.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fred Samuel Playground",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11209",
      "11228"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "Offers a \"nature 'startle display' effectiveness measurement game.\"",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dan Ross Playground",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fraser Square",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Provides a \"park 'sprites & jets' citizen scientist reporting portal.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Heckscher Playground",
    "park_location": "B",
    "park_zip": [
      "11221"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greenpoint Playground",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clumber Corner",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sidney Hillman Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Provides a \"park-specific 'chestnut blight' transgenic research ethics discussion.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mt. Carmel Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Locust Grove Civic Triangle",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "Offers a \"nature 'eyespot function' (predator distraction vs. intimidation) debate.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Manhattan Beach Park",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dodgers Triangle",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Provides a \"park 'volcanic lightning' charge separation mechanisms.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Forest Mall",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McKinley Park",
    "park_location": "B",
    "park_zip": [
      "11228"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Turtle Playground",
    "park_location": "Q",
    "park_zip": [
      "11367"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Amundsen Circle",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marlboro Playground",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "Provides a \"park-specific 'beech bark disease' forest management strategies.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cherry Clinton Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Plaza Lafayette",
    "park_location": "M",
    "park_zip": [
      "10033"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sherman Square",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "Offers a \"nature 'behavioral mimicry' in pollination deception.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Catherine Slip Malls",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hot Spot Tot Lot",
    "park_location": "B",
    "park_zip": [
      "11210"
    ],
    "description": "Provides a \"park 'thundersnow' safety during winter recreation.\"",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pvt. Sonsire Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Badame Sessa Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Penn Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Provides a \"park-specific 'rose rosette disease' alternative host plants.\"",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lithuania Square",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sheridan Triangle",
    "park_location": "X",
    "park_zip": [
      "10471"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bar and Grill Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Offers a \"nature 'acoustic mimicry' in predator-prey interactions.\"",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Heath Triangle",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10468"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerome Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Provides a \"park 'derecho' tree damage vs. tornado damage ID guide.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Heights Promenade",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Butterfly Gardens",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Father Demo Square",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McCarthy Square",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "Provides a \"park-specific 'peach tree borer' natural enemy insectary.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pearl St Playground",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "MacDonald Park",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vernam Barbadoes Peninsula",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "Offers a \"nature 'chemical mimicry' in parasitic plants.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Middle Village Veterans Triangle",
    "park_location": "Q",
    "park_zip": [
      "11379"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Provides a \"park 'haboob' health advisory for respiratory issues.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerome Park",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Canal Park",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Flamboyan Garden",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Graniteville Swamp Park",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Classon Triangle",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Provides a \"park-specific 'apple scab' organic management techniques.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Melrose Playground",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Horsebrook Island",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Derosa O'Boyle Triangle",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "Offers a \"nature 'Owenian mimicry' in avian brood parasitism.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Merriam Playground",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fountain Of Youth Playground",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "Provides a \"park 'microburst' aviation hazard education.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Devanney Triangle",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sparrow's Nest Community Garden",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brust Park",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10471"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vietnam Veterans Plaza",
    "park_location": "M",
    "park_zip": [
      "10004"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spuyten Duyvil Shorefront Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "Provides a \"park-specific 'grape phylloxera' historical solution timeline.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sixteen Oaks Grove",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marble Hill Playground",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10463"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "American Triangle",
    "park_location": "Q",
    "park_zip": [
      "11368"
    ],
    "description": "Offers a \"nature 'protective resemblance' evolution simulation game.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Henry Hudson Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Independence Playground",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10468"
    ],
    "description": "Provides a \"park 'steam devil' formation over geothermal features.\"",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bergen Triangle",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Straus Square",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "Includes a \"public 'green rim' observation protocol for consistency.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Townsend Walk",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "Provides a \"park-specific 'citrus greening' early detection techniques.\"",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Featherbenches",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Castle Hill Park",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Offers a \"nature 'aggressive resemblance' in ambush predators.\"",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Provides a \"park 'ball lightning' theories: plasma vs. vaporized silicon.\"",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Richman (Echo) Park",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mapes Pool",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abingdon Square",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Aqueduct Walk",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Provides a \"park-specific 'plum pox virus' quarantine regulations history.\"",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Inwood Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Plimpton Playground",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Offers a \"nature 'Batesian mimicry' evolution arms race display.\"",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Featherbed Triangle",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "Provides a \"park 'St. Elmo's fire' on animals historical accounts.\"",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "A Philip Randolph Square",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garlinge Triangle",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beanstalk Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Las Casitas Community Garden",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "El Batey Borincano Garden",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Provides a \"park-specific 'fire blight' weather-based risk assessment tool.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vidalia Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Miracle Garden",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Taylor-Soundview Block Assoc. Garden",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "Offers a \"nature 'M眉llerian mimicry' co-evolution timeline.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Muller Triangle",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Project Eden",
    "park_location": "Q",
    "park_zip": [
      "11375"
    ],
    "description": "Provides a \"park 'earthquake lights' contemporary research updates.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ahearn Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Morris Mesa",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walton Walk",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Palmer Inlet",
    "park_location": "X",
    "park_zip": [
      "10465"
    ],
    "description": "Provides a \"park-specific 'Dutch elm disease' resistant cultivar field trial.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hutton Triangle",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Whalen Grove",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Murphy Triangle",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Offers a \"nature 'startle display' in Lepidoptera (moths/butterflies).\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackson Square",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Martin Luther King Triangle",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Provides a \"park 'sprites & jets' detection via amateur radio.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mott Playground",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hancock Park",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brigadier General Charles Young Triangle",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Provides a \"park-specific 'chestnut blight' survivor tree cloning project.\"",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Amelia Gorman Park",
    "park_location": "M",
    "park_zip": [
      "10040"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Donnellan Square",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Duane Park",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "Offers a \"nature 'eyespot' development genetics display.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cedar Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Goble Playground",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Provides a \"park 'volcanic lightning' during 2022 Tonga eruption footage.\"",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ogden Plimpton Playground",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hook Creek Park",
    "park_location": "Q",
    "park_zip": [
      "11559",
      "11422"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackie Robinson Parkway",
    "park_location": "Q",
    "park_zip": [
      "11207",
      "11375",
      "11385",
      "11415"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Aimee Triangle",
    "park_location": "B",
    "park_zip": [
      "11229"
    ],
    "description": "Provides a \"park-specific 'beech bark disease' economic impact on forestry.\"",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "High Rock Park",
    "park_location": "R",
    "park_zip": [
      "10304",
      "10306"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Freshkills Park",
    "park_location": "R",
    "park_zip": [
      "10312",
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "Offers a \"nature 'behavioral mimicry' in aggressive ants.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Army Plaza",
    "park_location": "B",
    "park_zip": [
      "11215",
      "11217",
      "11238"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "American Veterans Memorial Pier",
    "park_location": "B",
    "park_zip": [
      "11220"
    ],
    "description": "Provides a \"park 'thundersnow' sound propagation characteristics.\"",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broadway Malls",
    "park_location": "M",
    "park_zip": [
      "10025",
      "10027"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Abigail Playground",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Seabury Playground",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flatbush Malls",
    "park_location": "B",
    "park_zip": [
      "11230"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ralph Demarco Park",
    "park_location": "Q",
    "park_zip": [
      "11105"
    ],
    "description": "Provides a \"park-specific 'rose rosette disease' vector mite dispersal study.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Freeway",
    "park_location": "Q",
    "park_zip": [
      "11691",
      "11692",
      "11693",
      "11694"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Laurelton Parkway",
    "park_location": "Q",
    "park_zip": [
      "11003",
      "11580",
      "11411",
      "11422"
    ],
    "description": "Offers a \"nature 'acoustic mimicry' in katydid predator avoidance.\"",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joseph Manna Park",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Shooters Island",
    "park_location": "R",
    "park_zip": [
      "10303"
    ],
    "description": "Provides a \"park 'derecho' recovery and community resilience stories.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Redfern Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Inwood Hill Park",
    "park_location": "M",
    "park_zip": [
      "10033",
      "10034"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ewen Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bayswater Park",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Beach and Boardwalk",
    "park_location": "Q",
    "park_zip": [
      "11691",
      "11692"
    ],
    "description": "Provides a \"park-specific 'peach tree borer' monitoring degree-day model.\"",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crescent Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stapleton Esplanade",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Elmjack Mall",
    "park_location": "Q",
    "park_zip": [
      "11372",
      "11373"
    ],
    "description": "Offers a \"nature 'chemical mimicry' in ant-plant mutualisms.\"",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tudor Park",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Gemini Fields",
    "park_location": "Q",
    "park_zip": [
      "11414"
    ],
    "description": "Provides a \"park 'haboob' safety for drivers: 'don't drive into dust.'\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carl Schurz Park",
    "park_location": "M",
    "park_zip": [
      "10028"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Old Place Creek Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Phyllis Post Goodman Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Coffey Park",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "Provides a \"park-specific 'apple scab' fungicide resistance management.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Roberto Clemente Ballfield",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cunningham Park",
    "park_location": "Q",
    "park_zip": [
      "11364",
      "11423",
      "11427"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Oxford Park",
    "park_location": "B",
    "park_zip": [
      "11217"
    ],
    "description": "Offers a \"nature 'Owenian mimicry' in cuckoo egg evolution.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dorrance Brooks Square",
    "park_location": "M",
    "park_zip": [
      "10030"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Archie Spigner Park",
    "park_location": "Q",
    "park_zip": [
      "11433"
    ],
    "description": "Provides a \"park 'microburst' vs. 'downburst' terminology clarification.\"",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dyker Beach Park",
    "park_location": "B",
    "park_zip": [
      "11209",
      "11228"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Union Square Park",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Franklin D. Roosevelt Boardwalk and Beach",
    "park_location": "R",
    "park_zip": [
      "10305",
      "10306"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Snug Harbor Cemetery",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dr. Thomasina Bushby Park",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "Provides a \"park-specific 'grape phylloxera' 'Great French Wine Blight' history.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Betsy Head Park",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Allison Pond Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Goodhue Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "Offers a \"nature 'protective resemblance' in insect egg camouflage.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tudor Malls",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Police Officer John G. Scarangella Park",
    "park_location": "B",
    "park_zip": [
      "11223"
    ],
    "description": "Provides a \"park 'steam devil' vs. 'steam vortex' terminology.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "American Playground",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "United Community Centers Youth Farm",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "I-Am-Park",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pugsley Creek Park",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "Includes a \"public 'green rim' observation historical records.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greenpoint Landing",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "Provides a \"park-specific 'citrus greening' insect vector biology.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Rochdale Playground",
    "park_location": "Q",
    "park_zip": [
      "11434"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Starlight Park",
    "park_location": "X",
    "park_zip": [
      "10459",
      "10472"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Trinity Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "Offers a \"nature 'aggressive resemblance' in spider web decorations.\"",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clove Lakes Park",
    "park_location": "R",
    "park_zip": [
      "10301",
      "10310"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Beach",
    "park_location": "Q",
    "park_zip": [
      "11694"
    ],
    "description": "Provides a \"park 'ball lightning' indoor occurrence anecdotes.\"",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "PS 4K PARADISE GARDEN",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Herbal Garden of East NY",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Drew Playground",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Beach Boardwalk",
    "park_location": "Q",
    "park_zip": [
      "11692",
      "11693",
      "11694"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Great Kills Park",
    "park_location": "R",
    "park_zip": [
      "10306"
    ],
    "description": "Provides a \"park-specific 'plum pox virus' symptoms identification guide.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Watson Houses Playground",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mill Pond Park",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Whitey Ford Field",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "Offers a \"nature 'Batesian mimicry' model abundance effect on mimic success.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ocean Parkway Malls",
    "park_location": "B",
    "park_zip": [
      "11218",
      "11223",
      "11224",
      "11230",
      "11235"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West 23rd St. Garden",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "Provides a \"park 'St. Elmo's fire' on people historical anecdotes.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Frederick Johnson Playground",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Highland Park",
    "park_location": "Q",
    "park_zip": [
      "11207",
      "11208",
      "11385"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peretz Square",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tramway Plaza",
    "park_location": "M",
    "park_zip": [
      "10022"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Community Park",
    "park_location": "Q",
    "park_zip": [
      "11691",
      "11692"
    ],
    "description": "Provides a \"park-specific 'fire blight' biocontrol using bacteriophages.\"",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Queensbridge Park",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Citywide Services Shops and Storehouse",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "Offers a \"nature 'M眉llerian mimicry' in poison dart frogs.\"",
    "park_type": "Operations",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rudd Playground",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marine Park",
    "park_location": "B",
    "park_zip": [
      "11229",
      "11234",
      "11235"
    ],
    "description": "Provides a \"park 'earthquake lights' possible piezoelectric mechanism.\"",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Charlton-Thompson Garden",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Central Park",
    "park_location": "M",
    "park_zip": [
      "10023",
      "10024",
      "10025"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Willowbrook Parkway",
    "park_location": "R",
    "park_zip": [
      "10302",
      "10303",
      "10306",
      "10314"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Crescent Beach Park",
    "park_location": "R",
    "park_zip": [
      "10308",
      "10312"
    ],
    "description": "Provides a \"park-specific 'Dutch elm disease' vector beetle flight dynamics.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Phoenix Community Garden",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broadway Malls",
    "park_location": "M",
    "park_zip": [
      "10031",
      "10032"
    ],
    "description": "Offers a \"nature 'startle display' in fish (e.g., eyespots on fins).\"",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arverne East Nature Preserve",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Blood Root Valley",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Provides a \"park 'sprites & jets' high-altitude aircraft observation.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Beach and Boardwalk",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sugar Hill Hope Garden",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Deere Park",
    "park_location": "R",
    "park_zip": [
      "10301",
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Al Qui帽ones Playground",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dunbar Playground",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Provides a \"park-specific 'chestnut blight' hypovirulence transmission study.\"",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Forest Park",
    "park_location": "Q",
    "park_zip": [
      "11375",
      "11385",
      "11415",
      "11421"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alley Pond Park",
    "park_location": "Q",
    "park_zip": [
      "11361",
      "11362",
      "11363",
      "11364",
      "11426"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Highbridge Park",
    "park_location": "M",
    "park_zip": [
      "10032",
      "10033",
      "10039",
      "10040",
      "10452"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Purple Playground",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kingsborough Houses Pacific Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mount Prospect Park",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Imagination Playground",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walter Miller III Memorial Garden (La Casa Frela)",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "Provides a \"park-specific 'beech bark disease' canker identification guide.\"",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kissena Corridor Park",
    "park_location": "Q",
    "park_zip": [
      "11365",
      "11366"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fresh Creek Nature Preserve",
    "park_location": "B",
    "park_zip": [
      "11236",
      "11239"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beach 17 Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Offers a \"nature 'behavioral mimicry' in cleaner fish vs. mimics.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Beach 30th Street Playground",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pelham Bay Park",
    "park_location": "X",
    "park_zip": [
      "10461",
      "10464",
      "10464",
      "10465",
      "10469",
      "10475",
      "10803"
    ],
    "description": "Provides a \"park 'thundersnow' lightning detection networks data.\"",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John Golden Park",
    "park_location": "Q",
    "park_zip": [
      "11360",
      "11361"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Asser Levy Park",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Plaza",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pelham Parkway",
    "park_location": "X",
    "park_zip": [
      "10458",
      "10460",
      "10461",
      "10462",
      "10467",
      "10469"
    ],
    "description": "Provides a \"park-specific 'rose rosette disease' alternative management: removal.\"",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eastern Parkway Extension",
    "park_location": "B",
    "park_zip": [
      "11207",
      "11233"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sutter Ballfields",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Offers a \"nature 'acoustic mimicry' in brood parasitic birds.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hilton Holiday Gardens",
    "park_location": "Q",
    "park_zip": [
      "11436"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Monsignor Crawford Field",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Provides a \"park 'derecho' tree species susceptibility comparison.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Kingsborough Houses Bergen Playground",
    "park_location": "B",
    "park_zip": [
      "11213"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dimattina Playground",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wards Island Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Southern Fields",
    "park_location": "Q",
    "park_zip": [
      "11420"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pralls Island",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Provides a \"park-specific 'peach tree borer' larval stage duration display.\"",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rainey Park",
    "park_location": "Q",
    "park_zip": [
      "11106"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hempstead Ballfield",
    "park_location": "Q",
    "park_zip": [
      "11429"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alley Athletic Playground",
    "park_location": "Q",
    "park_zip": [
      "11426"
    ],
    "description": "Offers a \"nature 'chemical mimicry' in orchid pollination by deception.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Queensboro Oval",
    "park_location": "M",
    "park_zip": [
      "10022"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brookfield Park",
    "park_location": "R",
    "park_zip": [
      "10308"
    ],
    "description": "Provides a \"park 'haboob' safety for outdoor events planning.\"",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Hamilton Athletic Field",
    "park_location": "B",
    "park_zip": [
      "11209"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McGuire Fields",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Linnaeus Park",
    "park_location": "Q",
    "park_zip": [
      "11364"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "College Point Park",
    "park_location": "Q",
    "park_zip": [
      "11356"
    ],
    "description": "Provides a \"park-specific 'apple scab' cultivar susceptibility chart.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harold Ickes Playground",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "College Point Fields",
    "park_location": "Q",
    "park_zip": [
      "11354",
      "11356"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Co-op City Field",
    "park_location": "X",
    "park_zip": [
      "10475"
    ],
    "description": "Offers a \"nature 'Owenian mimicry' in vidua finch chick mouth markings.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Samuel H. Young Park",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Laguardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "Provides a \"park 'microburst' damage assessment training for volunteers.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "LaGuardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dr. Charles R. Drew Park",
    "park_location": "Q",
    "park_zip": [
      "11436"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Canal Court",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Chappetto Square",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triborough Bridge Playground E",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "Provides a \"park-specific 'grape phylloxera' grafting demonstration vineyard.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triborough Bridge Playground D",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triborough Bridge Playground C",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vito Locascio Field",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "Offers a \"nature 'protective resemblance' in caterpillar posture mimicry.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Mary's Park",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem River Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "Provides a \"park 'steam devil' formation over hot springs.\"",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Father Macris Park",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "LaGuardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sheepshead Bay Piers",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "Offers a \"nature 'aposematism' search for warning signals in flora/fauna.\"",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tucker Place",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "An urban meadow intentionally maintained for biodiversity and casual recreation.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clove's Tail",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "Features a gently sloping amphitheater lawn for outdoor performances and gatherings.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Austin J. McDonald Playground",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Guardia Playground",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Includes a well-designed rain garden that beautifies while managing stormwater.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Martinez Playground",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walker Park",
    "park_location": "R",
    "park_zip": [
      "10310"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West 186th Street Basketball Court",
    "park_location": "M",
    "park_zip": [
      "10033"
    ],
    "description": "Contains a network of informal dirt paths favored by trail runners.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Leif Ericson Park",
    "park_location": "B",
    "park_zip": [
      "11219",
      "11220"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Adam Clayton Powell Jr. Malls",
    "park_location": "M",
    "park_zip": [
      "10026",
      "10027",
      "10030",
      "10039"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broadway Malls",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "LaGuardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Baruch Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Parade Ground",
    "park_location": "B",
    "park_zip": [
      "11226"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Quarry Ballfields",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem RBI",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "Includes a \"sensory trail\" with plants chosen for touch and fragrance.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rodney Park North",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rodney Park Center",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A public recreation center offering fitness areas, indoor activities, and community programming.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Broad Channel American Park",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Poseidon Playground",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Julio Carballo Fields",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Coney Island Boat Basin",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "Provides a \"park mobile\" library cart on weekends.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ambrosini Field",
    "park_location": "X",
    "park_zip": [
      "10464"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joan Of Arc Park",
    "park_location": "M",
    "park_zip": [
      "10024",
      "10025"
    ],
    "description": "Features a \"water playground\" with pumps, channels, and dams.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Columbus Park",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Maple Woods",
    "park_location": "R",
    "park_zip": [
      "10304"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Korean War Veterans Plaza",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A \"green connector\" linking several neighborhoods via pedestrian paths.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alexander's Alley",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "Features a \"four-season interest\" garden with year-round beauty.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "McLaughlin Playground",
    "park_location": "Q",
    "park_zip": [
      "11423"
    ],
    "description": "Offers \"adventure playground\" elements like loose parts and building materials.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Coney Island Creek Park",
    "park_location": "B",
    "park_zip": [
      "11224"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Garden Of Eden",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Provides a \"volunteer hub\" for park maintenance and events.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "River Avenue Parks",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A \"destination playground\" attracting families from across the region.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ralph Bunche Park",
    "park_location": "M",
    "park_zip": [
      "10017"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "South Gate Mall",
    "park_location": "Q",
    "park_zip": [
      "11413"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tribeca Dog Run",
    "park_location": "M",
    "park_zip": [
      "10007"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lillian D Wald Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "Provides a \"community shed\" storing shared garden tools.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bay Breeze Park",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A \"night-blooming garden\" with flowers that open after dusk.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cpl Fischer Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Features a \"park puzzle\" – a large, permanent outdoor jigsaw or maze.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clearview Park",
    "park_location": "Q",
    "park_zip": [
      "11360"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Barretto Park",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "LaGuardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "Provides a \"nature play\" area with stumps, boulders, and sand.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Whitestone Playground",
    "park_location": "Q",
    "park_zip": [
      "11357"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bridge Park 3",
    "park_location": "B",
    "park_zip": [
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Castle Hill Little League Field",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "William F. Passannante Ballfield",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joseph Rodman Drake Park & Enslaved African Burial Ground",
    "park_location": "X",
    "park_zip": [
      "10474"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Asser Levy Playground",
    "park_location": "M",
    "park_zip": [
      "10010"
    ],
    "description": "A \"demonstration forest\" showing sustainable forestry practices.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brownsville Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Overlook Park",
    "park_location": "Q",
    "park_zip": [
      "11369"
    ],
    "description": "Offers \"outdoor escape room\" style puzzles for teams.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wave Hill",
    "park_location": "X",
    "park_zip": [
      "10471"
    ],
    "description": "Includes a \"scent trail\" for the visually impaired, with aromatic plants.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackie Robinson Park",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rita Ley Triangle",
    "park_location": "X",
    "park_zip": [
      "10470"
    ],
    "description": "A \"reconciliation garden\" acknowledging indigenous history.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Washington's Walk",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Features a \"park history walk\" with then-and-now photo stands.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Siren Slope",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "Offers a \"green screen\" wall for photographers and filmmakers.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carmansville Playground",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "Includes a \"community weighing scale\" for produce from the garden.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "London Planetree Playground",
    "park_location": "Q",
    "park_zip": [
      "11416"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Daly Ave Garden",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Riverdale Playground",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bryan Park",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "Offers a \"seed dispersal\" demonstration garden.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Davidson Ave. Community Gardeners Group",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Slattery Playground",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mount Hope Garden",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Davidson Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "Features a \"park-specific tree species\" collection.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "Offers a \"biophilic design\" showcase integrating nature into built elements.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jardin De Las Rosas",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Williamsbridge Oval",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Valentine Varian House",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Risse Street Park",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Features a \"park benchmark\" survey marker visible to the public.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harris Park",
    "park_location": "X",
    "park_zip": [
      "10468"
    ],
    "description": "Offers \"nature bingo\" or scavenger hunt sheets at the entrance.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "X",
    "park_zip": [
      "10473"
    ],
    "description": "Includes a \"sensory deprivation garden\" focusing on a single sense intensely.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Herald Square",
    "park_location": "M",
    "park_zip": [
      "10001"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Arcilla Playground",
    "park_location": "X",
    "park_zip": [
      "10451",
      "10456"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grant Park",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "De Witt Clinton Park",
    "park_location": "M",
    "park_zip": [
      "10019"
    ],
    "description": "Offers a \"park podcast\" listening station with QR codes.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cleopatra Playground",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Half-Nelson Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mount Hope Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A \"bluebird trail\" with monitored nesting boxes.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grant Gore",
    "park_location": "B",
    "park_zip": [
      "11216"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Olmsted-Beil House Park",
    "park_location": "R",
    "park_zip": [
      "10312"
    ],
    "description": "Offers a \"quiet snowshoe\" trail in winter.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Downing Street Playground",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Highbridge Park",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Provides a \"park trading post\" for kids to swap natural treasures.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dyckman House Museum",
    "park_location": "M",
    "park_zip": [
      "10034"
    ],
    "description": "A \"sensory integration\" playground designed for all abilities.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Socrates Sculpture Park",
    "park_location": "Q",
    "park_zip": [
      "11106"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Ferry Park",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Coleman Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Greeley Square Park",
    "park_location": "M",
    "park_zip": [
      "10001"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Murphy Brothers Playground",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcus Garvey Park",
    "park_location": "M",
    "park_zip": [
      "10027"
    ],
    "description": "Features a \"park run club\" starting point.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mitchel Square",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "Offers a \"nature craft area\" with supplied materials on weekends.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Webster Playground",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Catharine Turner Richardson Park",
    "park_location": "Q",
    "park_zip": [
      "11363"
    ],
    "description": "Provides a \"park hero\" award board for volunteers.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rockaway Garage",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "A \"dappled sunlight\" forest path with a high canopy.",
    "park_type": "Operations",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nelson Playground",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lot",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "Offers a \"park adoption\" program for flower beds.",
    "park_type": "Lot",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Franz Sigel Park",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "D'Auria-Murphy Triangle",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Thorpe Family Playground",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A \"dry riverbed\" garden demonstrating xeriscaping.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Townsend Garden",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "Features a \"park time capsule\" to be opened on a future date.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Prospect Park",
    "park_location": "B",
    "park_zip": [
      "11215"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Belmont Playground",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "John Jay Park",
    "park_location": "M",
    "park_zip": [
      "10021"
    ],
    "description": "Provides a \"public magnifying glass\" on a post for inspecting nature.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Thomas Jefferson Park",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A \"micro-forest\" planted using the Miyawaki method for dense growth.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Elmhurst Park",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Features a \"park echo point\" where a shout returns.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Richard Tucker Square",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "Offers a \"historical reenactment\" green space on certain weekends.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Riverside Park",
    "park_location": "M",
    "park_zip": [
      "10027",
      "10031"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Prospect Playground",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "Provides a \"park-specific bird checklist\" available online.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stop & Go Playground",
    "park_location": "X",
    "park_zip": [
      "10457"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eae J Mitchell Park",
    "park_location": "X",
    "park_zip": [
      "10460"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Daniel Boone Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Offers a \"park pal\" program pairing volunteers with isolated seniors.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Taqwa Community Farm",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sweetgum Community Garden",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Paerdegat Basin Park",
    "park_location": "B",
    "park_zip": [
      "11234",
      "11236"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Eastern Parkway",
    "park_location": "B",
    "park_zip": [
      "11213",
      "11216",
      "11225",
      "11233",
      "11238"
    ],
    "description": "Features a \"park phonograph\" (old-fashioned speaker) playing period music.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Woodycrest Community Garden",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 186 Day Treatment Program",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "CS 134 Community Improvement Garden",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Provides a \"park webcam\" broadcasting a live view online.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Youth Village",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Genesis Park Community Garden",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rev Lena Irons Unity Park",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "Offers a \"park genealogy\" day tracing local family histories.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Morgan Playground",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackie Robinson Park Playground",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rev J Polite Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A \"water conservation\" garden using only collected rainwater.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Short Triangle",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "Features a \"park trading card\" series to collect.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Calvert Vaux Park",
    "park_location": "B",
    "park_zip": [
      "11214"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fort Washington Park",
    "park_location": "M",
    "park_zip": [
      "10032",
      "10033",
      "10034"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harris Garden",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "Provides a \"park-specific geocache\" with a logbook.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dr. Gertrude B. Kelly Playground",
    "park_location": "M",
    "park_zip": [
      "10011"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Luther Gulick Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Catherine's Park",
    "park_location": "M",
    "park_zip": [
      "10065"
    ],
    "description": "Offers a \"park pen pal\" program for kids.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Nicholas Park",
    "park_location": "M",
    "park_zip": [
      "10027",
      "10031"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mosholu Parkway",
    "park_location": "X",
    "park_zip": [
      "10458",
      "10467"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11693"
    ],
    "description": "A \"pollinator pathway\" linking to other green spaces.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Amersfort Park",
    "park_location": "B",
    "park_zip": [
      "11210"
    ],
    "description": "Features a \"park memory project\" recording oral histories.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Lafayette Square",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "James J Walker Park",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Courtlandt Avenue Association Garden",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Provides a \"park-specific plant hardiness zone\" sign.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Isla Verde Garden",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Ann's Block Association Garden",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "Features a \"park trivia trail\" with questions on signs.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Captain Rivera Playground",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Willis Playground",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Orchard Alley Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Provides a \"park timekeeper\" sundial or water clock.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Public Theater",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A \"historic quarry\" turned into a garden feature.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "United We Stand Garden",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "Features a \"park etymology\" sign explaining the name's origin.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Padre Plaza",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brook Park",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "LaTourette Park & Golf Course",
    "park_location": "R",
    "park_zip": [
      "10306",
      "10314"
    ],
    "description": "Provides a \"park-specific soil type\" display.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "People's Park",
    "park_location": "X",
    "park_zip": [
      "10454"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wishing Well Garden",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Features a \"park code of conduct\" displayed positively.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jackson-Forest Community Garden",
    "park_location": "X",
    "park_zip": [
      "10456"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jardin de la Roca",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Printers Park",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Provides a \"park-specific sunset\" viewing spot.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Fox Park",
    "park_location": "X",
    "park_zip": [
      "10455"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Haffen Park",
    "park_location": "X",
    "park_zip": [
      "10469"
    ],
    "description": "Features a \"park mascot\" statue or figure.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tompkins Square Park",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Verdi Square",
    "park_location": "M",
    "park_zip": [
      "10023"
    ],
    "description": "Includes a \"public rain garden\" demonstration.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hart To Hart",
    "park_location": "B",
    "park_zip": [
      "11206"
    ],
    "description": "Provides a \"park-specific star chart\" for night viewing.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Robert L. Clinkscales Playground and Community Garden",
    "park_location": "M",
    "park_zip": [
      "10039"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Los Amigos Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Features a \"park gratitude\" board for visitors to post notes.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Horseshoe Playground",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bronx Park",
    "park_location": "X",
    "park_zip": [
      "10458",
      "10460",
      "10462",
      "10467"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Worth Square",
    "park_location": "M",
    "park_zip": [
      "10010"
    ],
    "description": "Provides a \"park-specific bird migration\" map.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "St. Vartan Park",
    "park_location": "M",
    "park_zip": [
      "10016"
    ],
    "description": "A \"historic garden\" design (e.g., Victorian, Colonial).",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Roger Morris Park",
    "park_location": "M",
    "park_zip": [
      "10032"
    ],
    "description": "Features a \"park wish fountain\" where coins go to improvements.",
    "park_type": "Historic House Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Vesuvio Playground",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "J. Hood Wright Park",
    "park_location": "M",
    "park_zip": [
      "10033"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Robert Moses Playground",
    "park_location": "M",
    "park_zip": [
      "10017"
    ],
    "description": "Provides a \"park-specific plant propagation\" area.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "West 4th Street Courts",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Tanahey Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "Features a \"park kindness rock\" garden.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sara D. Roosevelt Park",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Agnes Haywood Playground",
    "park_location": "X",
    "park_zip": [
      "10467"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Almeda Playground",
    "park_location": "Q",
    "park_zip": [
      "11692"
    ],
    "description": "Provides a \"park-specific wildlife tracking\" station.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dag Hammarskjold Plaza",
    "park_location": "M",
    "park_zip": [
      "10017"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Loreto Playground",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "Features a \"park inspiration\" quote engraved on a bench.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "James Weldon Johnson Playground",
    "park_location": "M",
    "park_zip": [
      "10029"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "William McCray Playground",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stars & Stripes Playground",
    "park_location": "X",
    "park_zip": [
      "10466"
    ],
    "description": "Provides a \"park-specific erosion control\" demonstration.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Twenty-Four Sycamores Park",
    "park_location": "M",
    "park_zip": [
      "10065"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Van Nest Park",
    "park_location": "X",
    "park_zip": [
      "10462"
    ],
    "description": "Features a \"park ambassador\" animal (like a resident owl or hawk).",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peter Detmold Park",
    "park_location": "M",
    "park_zip": [
      "10022"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Stanley Isaacs Playground",
    "park_location": "M",
    "park_zip": [
      "10029",
      "10128"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Albert L. Parham Playground",
    "park_location": "B",
    "park_zip": [
      "11205"
    ],
    "description": "Provides a \"park-specific composting toilet\" demonstration.",
    "park_type": "Jointly Operated Pla",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Children's Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Joseph C. Sauer Park",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "Features a \"park dream board\" for future ideas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Charlton Plaza",
    "park_location": "M",
    "park_zip": [
      "10014"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "LaGuardia Landing Lights",
    "park_location": "Q",
    "park_zip": [
      "11370"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The High Line",
    "park_location": "M",
    "park_zip": [
      "10001",
      "10011",
      "10014"
    ],
    "description": "Provides a \"park-specific mycology\" (mushroom) guide.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jerzee Triangle",
    "park_location": "B",
    "park_zip": [
      "11235"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rodney Park South",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "Features a \"park poetry slam\" stage.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Rory Staunton Field",
    "park_location": "Q",
    "park_zip": [
      "11372"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Floyd Patterson Ballfields",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Midland Malls",
    "park_location": "Q",
    "park_zip": [
      "11432"
    ],
    "description": "Provides a \"park-specific geology\" cross-section model.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Marcy Park South",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cooney Grauer Field",
    "park_location": "X",
    "park_zip": [
      "10463"
    ],
    "description": "Features a \"park time travel\" theme with era-specific zones.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Bridge Park",
    "park_location": "B",
    "park_zip": [
      "11201",
      "11201",
      "11201",
      "11201",
      "11201"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "North 5th Street Pier and Park",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spring Creek Park Addition",
    "park_location": "Q",
    "park_zip": [
      "11208",
      "11414"
    ],
    "description": "Provides a \"park-specific lichen\" study area.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10309"
    ],
    "description": "A \"historic toll house\" site at an old park entrance.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "Features a \"park story circle\" for sharing tales.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Brooklyn Museum",
    "park_location": "B",
    "park_zip": [
      "11238"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Managed Sites",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "East River Esplanade",
    "park_location": "M",
    "park_zip": [
      "10028",
      "10029",
      "10035",
      "10128"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "Provides a \"park-specific fern\" collection.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ascenzi Square",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11233"
    ],
    "description": "Features a \"park gratitude tree\" for hanging thankful notes.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Justice Sotomayor Houses Playground",
    "park_location": "X",
    "park_zip": [
      "10472"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Coney Island Beach & Boardwalk",
    "park_location": "B",
    "park_zip": [
      "11224",
      "11235"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Waterfront Facility",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hallets Cove Playground",
    "park_location": "Q",
    "park_zip": [
      "11102",
      "11106"
    ],
    "description": "Provides a \"park-specific moss\" garden.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Belt Parkway/Shore Parkway",
    "park_location": "B",
    "park_zip": [
      "11208",
      "11209",
      "11214",
      "11223",
      "11228",
      "11234",
      "11235"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Jamaica Bay Park",
    "park_location": "Q",
    "park_zip": [
      "11096",
      "11430",
      "11691"
    ],
    "description": "Features a \"park dream catcher\" weaving demonstration.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Ciccarone Park",
    "park_location": "X",
    "park_zip": [
      "10458"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triborough Bridge Playground B",
    "park_location": "Q",
    "park_zip": [
      "11102"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Randall's Island Park",
    "park_location": "M",
    "park_zip": [
      "10035"
    ],
    "description": "Provides a \"park-specific algae\" sample viewing station.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Convent Garden",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "A \"historic canal\" towpath now a trail.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triangle",
    "park_location": "X",
    "park_zip": [
      "10451"
    ],
    "description": "Features a \"park kindness bench\" for making friends.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Udall's Park Preserve",
    "park_location": "Q",
    "park_zip": [
      "11363"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bushwick Inlet Park",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nine Heroes Plaza",
    "park_location": "Q",
    "park_zip": [
      "11373"
    ],
    "description": "Provides a \"park-specific insect hotel\" for native bees and bugs.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Martin Luther King, Jr. Playground",
    "park_location": "M",
    "park_zip": [
      "10026"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "Q",
    "park_zip": [
      "11414"
    ],
    "description": "Features a \"park wish list\" for donations and volunteering.",
    "park_type": "Strip",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11219"
    ],
    "description": "Offers a \"community hydroponics\" garden demonstration.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Riverside Park",
    "park_location": "M",
    "park_zip": [
      "10023",
      "10024",
      "10025"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Hoe Garden",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "Provides a \"park-specific bat house\" colony.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Sophie Irene Loeb",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Alexander Hamilton Playground",
    "park_location": "M",
    "park_zip": [
      "10031"
    ],
    "description": "Features a \"park compliment chain\" where visitors add links.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Washington Market Park",
    "park_location": "M",
    "park_zip": [
      "10013"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "La Isla Garden",
    "park_location": "X",
    "park_zip": [
      "10452"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Isham Park",
    "park_location": "M",
    "park_zip": [
      "10034"
    ],
    "description": "Provides a \"park-specific owl nesting\" box program.",
    "park_type": "Community Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Saw Mill Creek Marsh",
    "park_location": "R",
    "park_zip": [
      "10314"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "B",
    "park_zip": [
      "11207"
    ],
    "description": "Features a \"park pay-it-forward\" board for good deeds.",
    "park_type": "Undeveloped",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Windmill Community Garden",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Nameoke Park",
    "park_location": "Q",
    "park_zip": [
      "11691"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Harlem River Park",
    "park_location": "M",
    "park_zip": [
      "10032",
      "10033",
      "10034",
      "10037",
      "10039",
      "10040",
      "10451"
    ],
    "description": "Provides a \"park-specific turtle basking\" logs.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bronx River Parkway",
    "park_location": "X",
    "park_zip": [
      "10460",
      "10466",
      "10467",
      "10470",
      "10472",
      "10473",
      "10704"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Flushing Meadows Corona Park",
    "park_location": "Q",
    "park_zip": [
      "11354",
      "11355",
      "11367",
      "11368"
    ],
    "description": "Features a \"park memory lane\" with donated bricks.",
    "park_type": "Flagship Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Walton Park",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "Offers a \"community greywater\" recycling demo garden.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mabel Hampton Playground",
    "park_location": "X",
    "park_zip": [
      "10453"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "P.S. 125 Playground",
    "park_location": "B",
    "park_zip": [
      "11212"
    ],
    "description": "Provides a \"park-specific frog pond\" with chorus in spring.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "The Creative Little Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Carroll Park",
    "park_location": "B",
    "park_zip": [
      "11231"
    ],
    "description": "Features a \"park inspiration path\" with motivational stones.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park",
    "park_location": "R",
    "park_zip": [
      "10301"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "5th St Slope Garden",
    "park_location": "M",
    "park_zip": [
      "10009"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Dwyer Square",
    "park_location": "Q",
    "park_zip": [
      "11101"
    ],
    "description": "Provides a \"park-specific salamander\" habitat under logs.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Park Avenue Malls",
    "park_location": "M",
    "park_zip": [
      "10021",
      "10022",
      "10028",
      "10029",
      "10065",
      "10075",
      "10128"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clemens Triangle",
    "park_location": "Q",
    "park_zip": [
      "11385"
    ],
    "description": "Features a \"park dream mapping\" activity for visitors.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Meredith Woods",
    "park_location": "R",
    "park_zip": [
      "10309",
      "10314"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Orient Grove",
    "park_location": "B",
    "park_zip": [
      "11211"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Triangle",
    "park_location": "B",
    "park_zip": [
      "11234"
    ],
    "description": "Provides a \"park-specific newt\" breeding pond.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Pink Playground",
    "park_location": "B",
    "park_zip": [
      "11208"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Belt Parkway",
    "park_location": "Q",
    "park_zip": [
      "11413",
      "11414",
      "11420",
      "11430",
      "11434"
    ],
    "description": "Features a \"park goal-setting\" corner with reflection prompts.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peck Slip",
    "park_location": "M",
    "park_zip": [
      "10038"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Bufano Park",
    "park_location": "X",
    "park_zip": [
      "10461"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Courtney Callender Playground",
    "park_location": "M",
    "park_zip": [
      "10037"
    ],
    "description": "Provides a \"park-specific crayfish\" stream.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Minetta Playground",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Minetta Green",
    "park_location": "M",
    "park_zip": [
      "10012"
    ],
    "description": "Features a \"park vision board\" for community aspirations.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "First Park",
    "park_location": "M",
    "park_zip": [
      "10003"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Neighborhood Park",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Captain Jacob Joseph Playground",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A community playground featuring play structures, open areas, and family-friendly recreational space.",
    "park_type": "Playground",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Peter Chahales Park",
    "park_location": "Q",
    "park_zip": [
      "11378"
    ],
    "description": "Provides a \"park-specific mussel\" bed in clean water.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Clinton Community Garden (LES)",
    "park_location": "M",
    "park_zip": [
      "10002"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Garden",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Wellbrock Triangle",
    "park_location": "Q",
    "park_zip": [
      "11417"
    ],
    "description": "Features a \"park affirmation walk\" with positive statements.",
    "park_type": "Triangle/Plaza",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Henry Hudson Parkway",
    "park_location": "X",
    "park_zip": [
      "10463",
      "10471"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Field Of Dreams Court",
    "park_location": "X",
    "park_zip": [
      "10459"
    ],
    "description": "A local outdoor space providing accessible green areas and general recreational amenities.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Theodore Roosevelt Park",
    "park_location": "M",
    "park_zip": [
      "10024"
    ],
    "description": "Provides a \"park-specific aquatic insect\" study stream.",
    "park_type": "Buildings/Institutio",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Newtown Barge Playground",
    "park_location": "B",
    "park_zip": [
      "11222"
    ],
    "description": "A \"historic tanning vats\" area now a sunken garden.",
    "park_type": "Recreational Field/C",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Mall Thirty Four XXXIV",
    "park_location": "Q",
    "park_zip": [
      "11368",
      "11372"
    ],
    "description": "Features a \"park mindfulness maze\" for walking meditation.",
    "park_type": "Mall",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Spring Creek Park",
    "park_location": "B",
    "park_zip": [
      "11208",
      "11414"
    ],
    "description": "A neighborhood park offering green space, walking paths, and outdoor relaxation areas.",
    "park_type": "Nature Area",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Cross Island Parkway",
    "park_location": "Q",
    "park_zip": [
      "11003",
      "11357",
      "11359",
      "11360",
      "11361",
      "11362",
      "11364"
    ],
    "description": "A landscaped corridor providing pedestrian pathways and green buffer space.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  },
  {
    "park_name": "Grand Central Parkway Extension",
    "park_location": "Q",
    "park_zip": [
      "11103",
      "11367",
      "11368",
      "11369",
      "11370",
      "11371",
      "11375"
    ],
    "description": "Provides a \"park-specific plankton\" viewing microscope.",
    "park_type": "Parkway",
    "rating": 0,
    "reviewCount": 0
  }
];

const parksCollection = await parks();

await parksCollection.deleteMany({});

const result = await parksCollection.insertMany(parkData);

console.log(`Inserted ${result.insertedCount} parks`);

const count = await parksCollection.countDocuments();
console.log(`Total parks in database: ${count}`);

console.log('Done seeding database');

await closeConnection();
