import { State, School } from '@/types/auth.types';

export const INDIAN_STATES: State[] = [
  // States (28)
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', type: 'state' },
  { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', type: 'state' },
  { id: 'assam', name: 'Assam', type: 'state' },
  { id: 'bihar', name: 'Bihar', type: 'state' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', type: 'state' },
  { id: 'goa', name: 'Goa', type: 'state' },
  { id: 'gujarat', name: 'Gujarat', type: 'state' },
  { id: 'haryana', name: 'Haryana', type: 'state' },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', type: 'state' },
  { id: 'jharkhand', name: 'Jharkhand', type: 'state' },
  { id: 'karnataka', name: 'Karnataka', type: 'state' },
  { id: 'kerala', name: 'Kerala', type: 'state' },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', type: 'state' },
  { id: 'maharashtra', name: 'Maharashtra', type: 'state' },
  { id: 'manipur', name: 'Manipur', type: 'state' },
  { id: 'meghalaya', name: 'Meghalaya', type: 'state' },
  { id: 'mizoram', name: 'Mizoram', type: 'state' },
  { id: 'nagaland', name: 'Nagaland', type: 'state' },
  { id: 'odisha', name: 'Odisha', type: 'state' },
  { id: 'punjab', name: 'Punjab', type: 'state' },
  { id: 'rajasthan', name: 'Rajasthan', type: 'state' },
  { id: 'sikkim', name: 'Sikkim', type: 'state' },
  { id: 'tamil-nadu', name: 'Tamil Nadu', type: 'state' },
  { id: 'telangana', name: 'Telangana', type: 'state' },
  { id: 'tripura', name: 'Tripura', type: 'state' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', type: 'state' },
  { id: 'uttarakhand', name: 'Uttarakhand', type: 'state' },
  { id: 'west-bengal', name: 'West Bengal', type: 'state' },
  
  // Union Territories (8)
  { id: 'andaman-nicobar', name: 'Andaman and Nicobar Islands', type: 'union_territory' },
  { id: 'chandigarh', name: 'Chandigarh', type: 'union_territory' },
  { id: 'dadra-nagar-haveli-daman-diu', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'union_territory' },
  { id: 'delhi', name: 'Delhi', type: 'union_territory' },
  { id: 'jammu-kashmir', name: 'Jammu and Kashmir', type: 'union_territory' },
  { id: 'ladakh', name: 'Ladakh', type: 'union_territory' },
  { id: 'lakshadweep', name: 'Lakshadweep', type: 'union_territory' },
  { id: 'puducherry', name: 'Puducherry', type: 'union_territory' },
];

export const SCHOOLS: School[] = [
  // Delhi Schools
  { id: 'dps-delhi', name: 'Delhi Public School', stateId: 'delhi', type: 'private' },
  { id: 'modern-school-delhi', name: 'Modern School', stateId: 'delhi', type: 'private' },
  { id: 'sardar-patel-delhi', name: 'Sardar Patel Vidyalaya', stateId: 'delhi', type: 'public' },
  { id: 'springdales-delhi', name: 'Springdales School', stateId: 'delhi', type: 'private' },
  { id: 'lady-shri-ram-delhi', name: 'Lady Shri Ram College for Women', stateId: 'delhi', type: 'private' },
  { id: 'st-stephens-delhi', name: 'St. Stephen\'s College', stateId: 'delhi', type: 'private' },
  { id: 'dav-delhi', name: 'DAV Public School', stateId: 'delhi', type: 'private' },
  { id: 'kendriya-vidyalaya-delhi', name: 'Kendriya Vidyalaya', stateId: 'delhi', type: 'public' },

  // Maharashtra Schools
  { id: 'cathedral-mumbai', name: 'Cathedral and John Connon School', stateId: 'maharashtra', type: 'private' },
  { id: 'bombay-scottish-mumbai', name: 'Bombay Scottish School', stateId: 'maharashtra', type: 'private' },
  { id: 'dhirubhai-ambani-mumbai', name: 'Dhirubhai Ambani International School', stateId: 'maharashtra', type: 'private' },
  { id: 'jamnabai-narsee-mumbai', name: 'Jamnabai Narsee School', stateId: 'maharashtra', type: 'private' },
  { id: 'bombay-international-mumbai', name: 'Bombay International School', stateId: 'maharashtra', type: 'international' },
  { id: 'podar-mumbai', name: 'Podar International School', stateId: 'maharashtra', type: 'private' },
  { id: 'ryan-mumbai', name: 'Ryan International School', stateId: 'maharashtra', type: 'private' },
  { id: 'dps-mumbai', name: 'Delhi Public School Mumbai', stateId: 'maharashtra', type: 'private' },

  // Tamil Nadu Schools
  { id: 'padma-seshadri-chennai', name: 'Padma Seshadri Bala Bhavan', stateId: 'tamil-nadu', type: 'private' },
  { id: 'chennai-public-chennai', name: 'Chennai Public School', stateId: 'tamil-nadu', type: 'private' },
  { id: 'psbb-chennai', name: 'PSBB Learning Leadership Academy', stateId: 'tamil-nadu', type: 'private' },
  { id: 'vidya-mandir-chennai', name: 'Vidya Mandir Senior Secondary School', stateId: 'tamil-nadu', type: 'private' },
  { id: 'dav-chennai', name: 'DAV Boys Senior Secondary School', stateId: 'tamil-nadu', type: 'private' },
  { id: 'kendriya-vidyalaya-chennai', name: 'Kendriya Vidyalaya Chennai', stateId: 'tamil-nadu', type: 'public' },
  { id: 'st-michaels-chennai', name: 'St. Michael\'s Academy', stateId: 'tamil-nadu', type: 'private' },
  { id: 'velammal-chennai', name: 'Velammal International School', stateId: 'tamil-nadu', type: 'private' },

  // Karnataka Schools
  { id: 'bishop-cotton-bangalore', name: 'Bishop Cotton Boys\' School', stateId: 'karnataka', type: 'private' },
  { id: 'national-public-bangalore', name: 'National Public School', stateId: 'karnataka', type: 'private' },
  { id: 'indian-high-school-bangalore', name: 'The Indian High School', stateId: 'karnataka', type: 'private' },
  { id: 'dps-bangalore', name: 'Delhi Public School Bangalore', stateId: 'karnataka', type: 'private' },
  { id: 'ryan-bangalore', name: 'Ryan International School Bangalore', stateId: 'karnataka', type: 'private' },
  { id: 'kendriya-vidyalaya-bangalore', name: 'Kendriya Vidyalaya Bangalore', stateId: 'karnataka', type: 'public' },
  { id: 'st-josephs-bangalore', name: 'St. Joseph\'s Boys\' High School', stateId: 'karnataka', type: 'private' },
  { id: 'vidyaniketan-bangalore', name: 'Vidyaniketan Public School', stateId: 'karnataka', type: 'private' },

  // West Bengal Schools
  { id: 'la-martiniere-kolkata', name: 'La Martiniere for Boys', stateId: 'west-bengal', type: 'private' },
  { id: 'st-xaviers-kolkata', name: 'St. Xavier\'s Collegiate School', stateId: 'west-bengal', type: 'private' },
  { id: 'south-point-kolkata', name: 'South Point High School', stateId: 'west-bengal', type: 'private' },
  { id: 'modern-high-kolkata', name: 'Modern High School for Girls', stateId: 'west-bengal', type: 'private' },
  { id: 'birla-high-kolkata', name: 'Birla High School', stateId: 'west-bengal', type: 'private' },
  { id: 'kendriya-vidyalaya-kolkata', name: 'Kendriya Vidyalaya Kolkata', stateId: 'west-bengal', type: 'public' },
  { id: 'ramakrishna-mission-kolkata', name: 'Ramakrishna Mission School', stateId: 'west-bengal', type: 'private' },
  { id: 'don-bosco-kolkata', name: 'Don Bosco School', stateId: 'west-bengal', type: 'private' },

  // Gujarat Schools
  { id: 'ahmedabad-international', name: 'Ahmedabad International School', stateId: 'gujarat', type: 'international' },
  { id: 'dps-ahmedabad', name: 'Delhi Public School Ahmedabad', stateId: 'gujarat', type: 'private' },
  { id: 'ryan-ahmedabad', name: 'Ryan International School Ahmedabad', stateId: 'gujarat', type: 'private' },
  { id: 'kendriya-vidyalaya-ahmedabad', name: 'Kendriya Vidyalaya Ahmedabad', stateId: 'gujarat', type: 'public' },
  { id: 'st-xaviers-ahmedabad', name: 'St. Xavier\'s High School', stateId: 'gujarat', type: 'private' },
  { id: 'podar-ahmedabad', name: 'Podar International School Ahmedabad', stateId: 'gujarat', type: 'private' },
  { id: 'dhirubhai-ambani-ahmedabad', name: 'Dhirubhai Ambani International School', stateId: 'gujarat', type: 'private' },
  { id: 'zydus-school-ahmedabad', name: 'Zydus School for Excellence', stateId: 'gujarat', type: 'private' },

  // Uttar Pradesh Schools
  { id: 'dps-lucknow', name: 'Delhi Public School Lucknow', stateId: 'uttar-pradesh', type: 'private' },
  { id: 'city-montessori-lucknow', name: 'City Montessori School', stateId: 'uttar-pradesh', type: 'private' },
  { id: 'la-martiniere-lucknow', name: 'La Martiniere College', stateId: 'uttar-pradesh', type: 'private' },
  { id: 'kendriya-vidyalaya-lucknow', name: 'Kendriya Vidyalaya Lucknow', stateId: 'uttar-pradesh', type: 'public' },
  { id: 'ryan-lucknow', name: 'Ryan International School Lucknow', stateId: 'uttar-pradesh', type: 'private' },
  { id: 'st-francis-lucknow', name: 'St. Francis\' College', stateId: 'uttar-pradesh', type: 'private' },
  { id: 'dps-kanpur', name: 'Delhi Public School Kanpur', stateId: 'uttar-pradesh', type: 'private' },
  { id: 'allen-kanpur', name: 'Allen Career Institute', stateId: 'uttar-pradesh', type: 'private' },

  // Kerala Schools
  { id: 'chinmaya-thiruvananthapuram', name: 'Chinmaya Vidyalaya', stateId: 'kerala', type: 'private' },
  { id: 'kendriya-vidyalaya-thiruvananthapuram', name: 'Kendriya Vidyalaya Thiruvananthapuram', stateId: 'kerala', type: 'public' },
  { id: 'st-thomas-thiruvananthapuram', name: 'St. Thomas Central School', stateId: 'kerala', type: 'private' },
  { id: 'dps-kochi', name: 'Delhi Public School Kochi', stateId: 'kerala', type: 'private' },
  { id: 'ryan-kochi', name: 'Ryan International School Kochi', stateId: 'kerala', type: 'private' },
  { id: 'chinmaya-kochi', name: 'Chinmaya Vidyalaya Kochi', stateId: 'kerala', type: 'private' },
  { id: 'st-alberts-kochi', name: 'St. Albert\'s College', stateId: 'kerala', type: 'private' },
  { id: 'rajagiri-kochi', name: 'Rajagiri Public School', stateId: 'kerala', type: 'private' },

  // Punjab Schools
  { id: 'dps-chandigarh', name: 'Delhi Public School Chandigarh', stateId: 'punjab', type: 'private' },
  { id: 'ryan-chandigarh', name: 'Ryan International School Chandigarh', stateId: 'punjab', type: 'private' },
  { id: 'kendriya-vidyalaya-chandigarh', name: 'Kendriya Vidyalaya Chandigarh', stateId: 'punjab', type: 'public' },
  { id: 'st-johns-chandigarh', name: 'St. John\'s High School', stateId: 'punjab', type: 'private' },
  { id: 'dav-chandigarh', name: 'DAV Public School Chandigarh', stateId: 'punjab', type: 'private' },
  { id: 'gurukul-chandigarh', name: 'Gurukul Global School', stateId: 'punjab', type: 'private' },
  { id: 'sachdeva-chandigarh', name: 'Sachdeva Global School', stateId: 'punjab', type: 'private' },
  { id: 'pinegrove-chandigarh', name: 'Pinegrove School', stateId: 'punjab', type: 'private' },

  // Rajasthan Schools
  { id: 'dps-jaipur', name: 'Delhi Public School Jaipur', stateId: 'rajasthan', type: 'private' },
  { id: 'ryan-jaipur', name: 'Ryan International School Jaipur', stateId: 'rajasthan', type: 'private' },
  { id: 'kendriya-vidyalaya-jaipur', name: 'Kendriya Vidyalaya Jaipur', stateId: 'rajasthan', type: 'public' },
  { id: 'st-xaviers-jaipur', name: 'St. Xavier\'s School Jaipur', stateId: 'rajasthan', type: 'private' },
  { id: 'dav-jaipur', name: 'DAV Public School Jaipur', stateId: 'rajasthan', type: 'private' },
  { id: 'mayo-college-ajmer', name: 'Mayo College', stateId: 'rajasthan', type: 'private' },
  { id: 'birla-school-pilani', name: 'Birla School Pilani', stateId: 'rajasthan', type: 'private' },
  { id: 'maharani-gayatri-devi-jaipur', name: 'Maharani Gayatri Devi Girls\' School', stateId: 'rajasthan', type: 'private' },

  // Haryana Schools
  { id: 'dps-gurgaon', name: 'Delhi Public School Gurgaon', stateId: 'haryana', type: 'private' },
  { id: 'ryan-gurgaon', name: 'Ryan International School Gurgaon', stateId: 'haryana', type: 'private' },
  { id: 'kendriya-vidyalaya-gurgaon', name: 'Kendriya Vidyalaya Gurgaon', stateId: 'haryana', type: 'public' },
  { id: 'shiv-nadar-gurgaon', name: 'Shiv Nadar School', stateId: 'haryana', type: 'private' },
  { id: 'pathways-gurgaon', name: 'Pathways School', stateId: 'haryana', type: 'private' },
  { id: 'dav-gurgaon', name: 'DAV Public School Gurgaon', stateId: 'haryana', type: 'private' },
  { id: 'heritage-gurgaon', name: 'Heritage School', stateId: 'haryana', type: 'private' },
  { id: 'suncity-gurgaon', name: 'Suncity School', stateId: 'haryana', type: 'private' },

  // Andhra Pradesh Schools
  { id: 'dps-hyderabad', name: 'Delhi Public School Hyderabad', stateId: 'andhra-pradesh', type: 'private' },
  { id: 'ryan-hyderabad', name: 'Ryan International School Hyderabad', stateId: 'andhra-pradesh', type: 'private' },
  { id: 'kendriya-vidyalaya-hyderabad', name: 'Kendriya Vidyalaya Hyderabad', stateId: 'andhra-pradesh', type: 'public' },
  { id: 'chinmaya-hyderabad', name: 'Chinmaya Vidyalaya Hyderabad', stateId: 'andhra-pradesh', type: 'private' },
  { id: 'dav-hyderabad', name: 'DAV Public School Hyderabad', stateId: 'andhra-pradesh', type: 'private' },
  { id: 'birla-hyderabad', name: 'Birla Open Minds International School', stateId: 'andhra-pradesh', type: 'private' },
  { id: 'oakridge-hyderabad', name: 'Oakridge International School', stateId: 'andhra-pradesh', type: 'international' },
  { id: 'st-peters-hyderabad', name: 'St. Peter\'s High School', stateId: 'andhra-pradesh', type: 'private' },

  // Telangana Schools
  { id: 'dps-telangana', name: 'Delhi Public School Telangana', stateId: 'telangana', type: 'private' },
  { id: 'ryan-telangana', name: 'Ryan International School Telangana', stateId: 'telangana', type: 'private' },
  { id: 'kendriya-vidyalaya-telangana', name: 'Kendriya Vidyalaya Telangana', stateId: 'telangana', type: 'public' },
  { id: 'chinmaya-telangana', name: 'Chinmaya Vidyalaya Telangana', stateId: 'telangana', type: 'private' },
  { id: 'dav-telangana', name: 'DAV Public School Telangana', stateId: 'telangana', type: 'private' },
  { id: 'birla-telangana', name: 'Birla Open Minds International School Telangana', stateId: 'telangana', type: 'private' },
  { id: 'oakridge-telangana', name: 'Oakridge International School Telangana', stateId: 'telangana', type: 'international' },
  { id: 'st-peters-telangana', name: 'St. Peter\'s High School Telangana', stateId: 'telangana', type: 'private' },

  // Madhya Pradesh Schools
  { id: 'dps-bhopal', name: 'Delhi Public School Bhopal', stateId: 'madhya-pradesh', type: 'private' },
  { id: 'ryan-bhopal', name: 'Ryan International School Bhopal', stateId: 'madhya-pradesh', type: 'private' },
  { id: 'kendriya-vidyalaya-bhopal', name: 'Kendriya Vidyalaya Bhopal', stateId: 'madhya-pradesh', type: 'public' },
  { id: 'dav-bhopal', name: 'DAV Public School Bhopal', stateId: 'madhya-pradesh', type: 'private' },
  { id: 'st-josephs-bhopal', name: 'St. Joseph\'s Convent School', stateId: 'madhya-pradesh', type: 'private' },
  { id: 'chinmaya-bhopal', name: 'Chinmaya Vidyalaya Bhopal', stateId: 'madhya-pradesh', type: 'private' },
  { id: 'birla-bhopal', name: 'Birla School Bhopal', stateId: 'madhya-pradesh', type: 'private' },
  { id: 'st-pauls-bhopal', name: 'St. Paul\'s School', stateId: 'madhya-pradesh', type: 'private' },

  // Bihar Schools
  { id: 'dps-patna', name: 'Delhi Public School Patna', stateId: 'bihar', type: 'private' },
  { id: 'ryan-patna', name: 'Ryan International School Patna', stateId: 'bihar', type: 'private' },
  { id: 'kendriya-vidyalaya-patna', name: 'Kendriya Vidyalaya Patna', stateId: 'bihar', type: 'public' },
  { id: 'dav-patna', name: 'DAV Public School Patna', stateId: 'bihar', type: 'private' },
  { id: 'st-michaels-patna', name: 'St. Michael\'s High School', stateId: 'bihar', type: 'private' },
  { id: 'chinmaya-patna', name: 'Chinmaya Vidyalaya Patna', stateId: 'bihar', type: 'private' },
  { id: 'birla-patna', name: 'Birla School Patna', stateId: 'bihar', type: 'private' },
  { id: 'st-josephs-patna', name: 'St. Joseph\'s Convent School', stateId: 'bihar', type: 'private' },

  // Odisha Schools
  { id: 'dps-bhubaneswar', name: 'Delhi Public School Bhubaneswar', stateId: 'odisha', type: 'private' },
  { id: 'ryan-bhubaneswar', name: 'Ryan International School Bhubaneswar', stateId: 'odisha', type: 'private' },
  { id: 'kendriya-vidyalaya-bhubaneswar', name: 'Kendriya Vidyalaya Bhubaneswar', stateId: 'odisha', type: 'public' },
  { id: 'dav-bhubaneswar', name: 'DAV Public School Bhubaneswar', stateId: 'odisha', type: 'private' },
  { id: 'st-josephs-bhubaneswar', name: 'St. Joseph\'s Convent School', stateId: 'odisha', type: 'private' },
  { id: 'chinmaya-bhubaneswar', name: 'Chinmaya Vidyalaya Bhubaneswar', stateId: 'odisha', type: 'private' },
  { id: 'birla-bhubaneswar', name: 'Birla School Bhubaneswar', stateId: 'odisha', type: 'private' },
  { id: 'st-pauls-bhubaneswar', name: 'St. Paul\'s School', stateId: 'odisha', type: 'private' },

  // Assam Schools
  { id: 'dps-guwahati', name: 'Delhi Public School Guwahati', stateId: 'assam', type: 'private' },
  { id: 'ryan-guwahati', name: 'Ryan International School Guwahati', stateId: 'assam', type: 'private' },
  { id: 'kendriya-vidyalaya-guwahati', name: 'Kendriya Vidyalaya Guwahati', stateId: 'assam', type: 'public' },
  { id: 'dav-guwahati', name: 'DAV Public School Guwahati', stateId: 'assam', type: 'private' },
  { id: 'st-marys-guwahati', name: 'St. Mary\'s School', stateId: 'assam', type: 'private' },
  { id: 'chinmaya-guwahati', name: 'Chinmaya Vidyalaya Guwahati', stateId: 'assam', type: 'private' },
  { id: 'birla-guwahati', name: 'Birla School Guwahati', stateId: 'assam', type: 'private' },
  { id: 'st-josephs-guwahati', name: 'St. Joseph\'s Convent School', stateId: 'assam', type: 'private' },

  // Jharkhand Schools
  { id: 'dps-ranchi', name: 'Delhi Public School Ranchi', stateId: 'jharkhand', type: 'private' },
  { id: 'ryan-ranchi', name: 'Ryan International School Ranchi', stateId: 'jharkhand', type: 'private' },
  { id: 'kendriya-vidyalaya-ranchi', name: 'Kendriya Vidyalaya Ranchi', stateId: 'jharkhand', type: 'public' },
  { id: 'dav-ranchi', name: 'DAV Public School Ranchi', stateId: 'jharkhand', type: 'private' },
  { id: 'st-thomas-ranchi', name: 'St. Thomas School', stateId: 'jharkhand', type: 'private' },
  { id: 'chinmaya-ranchi', name: 'Chinmaya Vidyalaya Ranchi', stateId: 'jharkhand', type: 'private' },
  { id: 'birla-ranchi', name: 'Birla School Ranchi', stateId: 'jharkhand', type: 'private' },
  { id: 'st-josephs-ranchi', name: 'St. Joseph\'s Convent School', stateId: 'jharkhand', type: 'private' },

  // Chhattisgarh Schools
  { id: 'dps-raipur', name: 'Delhi Public School Raipur', stateId: 'chhattisgarh', type: 'private' },
  { id: 'ryan-raipur', name: 'Ryan International School Raipur', stateId: 'chhattisgarh', type: 'private' },
  { id: 'kendriya-vidyalaya-raipur', name: 'Kendriya Vidyalaya Raipur', stateId: 'chhattisgarh', type: 'public' },
  { id: 'dav-raipur', name: 'DAV Public School Raipur', stateId: 'chhattisgarh', type: 'private' },
  { id: 'st-josephs-raipur', name: 'St. Joseph\'s Convent School', stateId: 'chhattisgarh', type: 'private' },
  { id: 'chinmaya-raipur', name: 'Chinmaya Vidyalaya Raipur', stateId: 'chhattisgarh', type: 'private' },
  { id: 'birla-raipur', name: 'Birla School Raipur', stateId: 'chhattisgarh', type: 'private' },
  { id: 'st-pauls-raipur', name: 'St. Paul\'s School', stateId: 'chhattisgarh', type: 'private' },

  // Goa Schools
  { id: 'dps-goa', name: 'Delhi Public School Goa', stateId: 'goa', type: 'private' },
  { id: 'ryan-goa', name: 'Ryan International School Goa', stateId: 'goa', type: 'private' },
  { id: 'kendriya-vidyalaya-goa', name: 'Kendriya Vidyalaya Goa', stateId: 'goa', type: 'public' },
  { id: 'dav-goa', name: 'DAV Public School Goa', stateId: 'goa', type: 'private' },
  { id: 'st-josephs-goa', name: 'St. Joseph\'s Convent School', stateId: 'goa', type: 'private' },
  { id: 'chinmaya-goa', name: 'Chinmaya Vidyalaya Goa', stateId: 'goa', type: 'private' },
  { id: 'birla-goa', name: 'Birla School Goa', stateId: 'goa', type: 'private' },
  { id: 'st-pauls-goa', name: 'St. Paul\'s School', stateId: 'goa', type: 'private' },

  // Himachal Pradesh Schools
  { id: 'dps-shimla', name: 'Delhi Public School Shimla', stateId: 'himachal-pradesh', type: 'private' },
  { id: 'ryan-shimla', name: 'Ryan International School Shimla', stateId: 'himachal-pradesh', type: 'private' },
  { id: 'kendriya-vidyalaya-shimla', name: 'Kendriya Vidyalaya Shimla', stateId: 'himachal-pradesh', type: 'public' },
  { id: 'dav-shimla', name: 'DAV Public School Shimla', stateId: 'himachal-pradesh', type: 'private' },
  { id: 'st-josephs-shimla', name: 'St. Joseph\'s Convent School', stateId: 'himachal-pradesh', type: 'private' },
  { id: 'chinmaya-shimla', name: 'Chinmaya Vidyalaya Shimla', stateId: 'himachal-pradesh', type: 'private' },
  { id: 'birla-shimla', name: 'Birla School Shimla', stateId: 'himachal-pradesh', type: 'private' },
  { id: 'st-pauls-shimla', name: 'St. Paul\'s School', stateId: 'himachal-pradesh', type: 'private' },

  // Uttarakhand Schools
  { id: 'dps-dehradun', name: 'Delhi Public School Dehradun', stateId: 'uttarakhand', type: 'private' },
  { id: 'ryan-dehradun', name: 'Ryan International School Dehradun', stateId: 'uttarakhand', type: 'private' },
  { id: 'kendriya-vidyalaya-dehradun', name: 'Kendriya Vidyalaya Dehradun', stateId: 'uttarakhand', type: 'public' },
  { id: 'dav-dehradun', name: 'DAV Public School Dehradun', stateId: 'uttarakhand', type: 'private' },
  { id: 'st-josephs-dehradun', name: 'St. Joseph\'s Convent School', stateId: 'uttarakhand', type: 'private' },
  { id: 'chinmaya-dehradun', name: 'Chinmaya Vidyalaya Dehradun', stateId: 'uttarakhand', type: 'private' },
  { id: 'birla-dehradun', name: 'Birla School Dehradun', stateId: 'uttarakhand', type: 'private' },
  { id: 'st-pauls-dehradun', name: 'St. Paul\'s School', stateId: 'uttarakhand', type: 'private' },

  // Union Territories - Chandigarh
  { id: 'dps-chandigarh-ut', name: 'Delhi Public School Chandigarh', stateId: 'chandigarh', type: 'private' },
  { id: 'ryan-chandigarh-ut', name: 'Ryan International School Chandigarh', stateId: 'chandigarh', type: 'private' },
  { id: 'kendriya-vidyalaya-chandigarh-ut', name: 'Kendriya Vidyalaya Chandigarh', stateId: 'chandigarh', type: 'public' },
  { id: 'dav-chandigarh-ut', name: 'DAV Public School Chandigarh', stateId: 'chandigarh', type: 'private' },
  { id: 'st-josephs-chandigarh-ut', name: 'St. Joseph\'s Convent School', stateId: 'chandigarh', type: 'private' },
  { id: 'chinmaya-chandigarh-ut', name: 'Chinmaya Vidyalaya Chandigarh', stateId: 'chandigarh', type: 'private' },
  { id: 'birla-chandigarh-ut', name: 'Birla School Chandigarh', stateId: 'chandigarh', type: 'private' },
  { id: 'st-pauls-chandigarh-ut', name: 'St. Paul\'s School', stateId: 'chandigarh', type: 'private' },

  // Union Territories - Puducherry
  { id: 'dps-puducherry', name: 'Delhi Public School Puducherry', stateId: 'puducherry', type: 'private' },
  { id: 'ryan-puducherry', name: 'Ryan International School Puducherry', stateId: 'puducherry', type: 'private' },
  { id: 'kendriya-vidyalaya-puducherry', name: 'Kendriya Vidyalaya Puducherry', stateId: 'puducherry', type: 'public' },
  { id: 'dav-puducherry', name: 'DAV Public School Puducherry', stateId: 'puducherry', type: 'private' },
  { id: 'st-josephs-puducherry', name: 'St. Joseph\'s Convent School', stateId: 'puducherry', type: 'private' },
  { id: 'chinmaya-puducherry', name: 'Chinmaya Vidyalaya Puducherry', stateId: 'puducherry', type: 'private' },
  { id: 'birla-puducherry', name: 'Birla School Puducherry', stateId: 'puducherry', type: 'private' },
  { id: 'st-pauls-puducherry', name: 'St. Paul\'s School', stateId: 'puducherry', type: 'private' },
];

// Helper function to get schools by state
export const getSchoolsByState = (stateId: string): School[] => {
  return SCHOOLS.filter(school => school.stateId === stateId);
};

// Helper function to get state by ID
export const getStateById = (stateId: string): State | undefined => {
  return INDIAN_STATES.find(state => state.id === stateId);
};
