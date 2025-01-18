interface EmailTemplateParams {
  mpName: string;
  constituency: string;
  fullName: string;
  address: string;
  postcode: string;
  telephone: string;
}

const formatPostcode = (postcode: string) => {
  const cleaned = postcode.replace(/\s+/g, "").toUpperCase();
  return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
};

export const emailSubjects = [
  "Urgent: Addressing Extreme Wealth Inequality in the UK",
  "Concerning Wealth Concentration in Britain",
  "Action Needed on Growing Wealth Disparity",
  "The Housing Crisis and Wealth Inequality",
  "Wealth Inequality: A Threat to Our Democracy",
  "Rising Asset Prices and Economic Stability",
  "Urgent: 200 Families vs UK's GDP - We Need Action",
  "50 Families Control More Than Half of UK - Your Response?",
  "Housing Crisis: A Symptom of Wealth Inequality",
  "Economic Stability at Risk Due to Wealth Concentration"
];

export const emailTemplates = [
  ({ mpName, constituency, fullName, address, postcode, telephone }: EmailTemplateParams) => `Dear ${mpName},

How do you plan to deal with the exploding wealth inequality in the UK?

The richest 1% of Britons hold more wealth than 70% of Britons, while the four richest Britons have more wealth than 20 million Britons.

How can we grow our economy when no one has any money to buy goods and services?

Asset prices are soaring due to the wealth explosion of the rich and as I'm sure you are aware there is growing unrest across the UK. This is shown by the uprising of far-right activists.

As the MP of ${constituency}, please could you raise this point in parliament.

I eagerly await your response.

Kind regards,
${fullName}

Address: ${address} ${formatPostcode(postcode)}
Tel: ${telephone}`,

  // Alternative template 1
  ({ mpName, constituency, fullName, address, postcode, telephone }: EmailTemplateParams) => `Dear ${mpName},

I am writing to express my deep concern about the growing wealth inequality crisis in our country.

Recent statistics show that wealth inequality in the UK has reached alarming levels, with the richest 1% now controlling more wealth than 70% of the population combined. Even more shocking, just four individuals possess more wealth than 20 million of our fellow citizens.

This extreme concentration of wealth is not just a matter of numbers, it's actively hampering our economic growth. When the majority of people are struggling to make ends meet, how can we expect to have a thriving economy based on consumer spending?

As my representative in ${constituency}, I urge you to address this critical issue in Parliament. The stability of our society depends on taking meaningful action to address this imbalance.

I look forward to hearing your thoughts on this matter and learning about what specific steps you plan to take.

Yours sincerely,
${fullName}

Address: ${address} ${formatPostcode(postcode)}
Tel: ${telephone}`,

  // Alternative template 2
  ({ mpName, constituency, fullName, address, postcode, telephone }: EmailTemplateParams) => `Dear ${mpName},

I am writing regarding the concerning wealth disparity in our country that requires immediate attention.

The current situation, where the four wealthiest individuals in Britain possess more wealth than 20 million people combined, is simply unsustainable. 

The concentration of wealth in such few hands is creating significant barriers to economic growth. When the majority of the population has limited purchasing power, it becomes increasingly difficult to maintain a healthy, consumer-driven economy.

As a resident of ${constituency}, I am asking you to make this issue a priority in Parliament. We need concrete action to address this growing divide before it leads to further social and economic instability.

Please let me know what specific measures you support to address this critical issue.

Best regards,
${fullName}

Address: ${address} ${formatPostcode(postcode)}
Tel: ${telephone}`,

  // New template 3
  ({ mpName, constituency, fullName, address, postcode, telephone }: EmailTemplateParams) => `Dear ${mpName},

I am writing to express my grave concerns about wealth distribution in our country.

By 2035, the wealth of the richest 200 families in the UK is projected to be larger than the entire UK GDP. This unprecedented concentration of wealth in the hands of so few poses a serious threat to our democracy and economic stability.

This trajectory is deeply troubling. When such a small group controls more wealth than our entire nation produces, it undermines the very foundations of our market economy and democratic society.

As my representative in ${constituency}, I urge you to take immediate action. We need comprehensive reforms to address this dangerous concentration of wealth before it's too late.

What specific measures do you propose to address this critical issue?

Yours sincerely,
${fullName}

Address: ${address} ${formatPostcode(postcode)}
Tel: ${telephone}`,

  // New template 4
  ({ mpName, constituency, fullName, address, postcode, telephone }: EmailTemplateParams) => `Dear ${mpName},

I am writing regarding an alarming statistic that demands immediate attention from our parliamentary representatives.

The richest 50 families in the UK held more wealth (£466 billion) than half of the UK population (33.5 million people). This staggering inequality represents a fundamental failure in our economic system.

How can we claim to be a fair and democratic society when 50 families control more resources than 33.5 million of their fellow citizens? This extreme concentration of wealth is creating a two-tier society that threatens our social fabric and economic stability.

As the MP for ${constituency}, you have the power and responsibility to address this crisis. What steps will you take to ensure a more equitable distribution of wealth in our society?

I look forward to hearing your concrete proposals on this matter.

Kind regards,
${fullName}

Address: ${address} ${formatPostcode(postcode)}
Tel: ${telephone}`,

  // New template 5
  ({ mpName, constituency, fullName, address, postcode, telephone }: EmailTemplateParams) => `Dear ${mpName},

I am writing to you about the growing housing crisis and wealth inequality in our country.

The UK-wide house price to earnings ratio stood at 5.2 at the end of 2023, which is well above the long-run average of 3.9, as the wealthiest are purchasing assets at an astounding rate. Ordinary working people are being priced out of having a home.

This is a symptom of a deeper problem where wealth is increasingly concentrated in fewer hands, creating a society where the majority of people struggle to achieve even basic financial security.

As my representative in ${constituency}, what specific actions will you take to address both the housing crisis and the broader issue of wealth inequality? We need meaningful reform.

I await your response with great interest.

Best regards,
${fullName}

Address: ${address} ${formatPostcode(postcode)}
Tel: ${telephone}`
]; 