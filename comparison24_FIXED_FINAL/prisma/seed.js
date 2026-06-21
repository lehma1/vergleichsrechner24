const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.clickTracking.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.offerRequest.deleteMany({});
  await prisma.offer.deleteMany({});
  await prisma.provider.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Admin
  const adminPasswordHash = await bcrypt.hash('password', 10);
  await prisma.user.create({
    data: {
      email: 'admin@vergleichsrechner.de',
      passwordHash: adminPasswordHash,
      firstName: 'Admin',
      lastName: 'Vergleichsrechner',
      role: 'admin',
      emailVerified: true,
    },
  });

  // Providers
  const providersData = [
    { name: 'ING', country: 'DE', description: 'One of the largest direct banks in Germany with attractive conditions.', websiteUrl: 'https://www.ing.de' },
    { name: 'DKB', country: 'DE', description: 'Deutsche Kreditbank offers favorable conditions and excellent online banking.', websiteUrl: 'https://www.dkb.de' },
    { name: 'Comdirect', country: 'DE', description: 'Comdirect Bank – modern direct bank with a wide range of products for savers.', websiteUrl: 'https://www.comdirect.de' },
    { name: 'Renault Bank direkt', country: 'DE', description: 'Renault Bank direkt offers competitive fixed-term and savings conditions.', websiteUrl: 'https://www.renault-bank-direkt.de' },
    { name: 'Weltsparen / Raisin', country: 'DE', description: 'Europe\'s leading platform for savings and fixed-term products from all over Europe.', websiteUrl: 'https://www.weltsparen.de' },
    { name: 'NIBC Direct', country: 'NL', description: 'Dutch direct bank with excellent fixed-term interest rates.', websiteUrl: 'https://www.nibcdirect.de' },
    { name: 'Bigbank', country: 'EE', description: 'Estonian bank with very attractive fixed-term interest rates, EU-regulated.', websiteUrl: 'https://www.bigbank.de' },
    { name: 'Santander', country: 'DE', description: 'International major bank with German fixed-term offers.', websiteUrl: 'https://www.santander.de' },
    { name: 'Barclays', country: 'GB', description: 'British traditional bank with competitive savings products.', websiteUrl: 'https://www.barclays.de' },
    { name: 'Opel Bank', country: 'DE', description: 'Opel Bank offers attractive fixed-term conditions with flexible terms.', websiteUrl: 'https://www.opelbank.de' },
    { name: 'Wamo Bank', country: 'MT', description: 'Innovative digital banking solutions from Malta for modern savers.', websiteUrl: 'https://wamo.io' },
    { name: 'Central Bank of Malta', country: 'MT', description: 'The Central Bank of Malta offers maximum security and stability.', websiteUrl: 'https://www.centralbankmalta.org' },
    { name: 'Commerzbank', country: 'DE', description: 'One of the leading major banks in Germany with comprehensive service.', websiteUrl: 'https://www.commerzbank.de' },
    { name: 'Schwyzer Kantonalbank', country: 'CH', description: 'Traditional Swiss security and first-class interest conditions.', websiteUrl: 'https://www.szkb.ch' },
    { name: 'Deutsche Bank', country: 'DE', description: 'Germany\'s largest bank with global expertise and secure savings products.', websiteUrl: 'https://www.deutsche-bank.de' },
  ];

  const providers = [];
  for (const p of providersData) {
    const created = await prisma.provider.create({ data: p });
    providers.push(created);
  }

  const findProvider = (name) => providers.find(p => p.name === name).id;

  // Offers
  const offersData = [
    { type: 'festgeld', providerId: findProvider('Bigbank'), interestRate: 4.050, minInvestment: 5000, maxInvestment: 500000, durationMonths: 12, description: 'Festgeld 12 Monate – Top-Zins von Bigbank', conditions: 'Einlagensicherung bis 100.000 EUR. Mindestanlage 5.000 EUR.', isActive: true, isFeatured: true },
    { type: 'festgeld', providerId: findProvider('NIBC Direct'), interestRate: 3.900, minInvestment: 5000, maxInvestment: 1000000, durationMonths: 12, description: 'NIBC Direct Festgeld 12 Monate', conditions: 'Niederländische Einlagensicherung bis 100.000 EUR.', isActive: true, isFeatured: true },
    { type: 'festgeld', providerId: findProvider('Renault Bank direkt'), interestRate: 3.750, minInvestment: 5000, maxInvestment: 500000, durationMonths: 12, description: 'Renault Bank Festgeld 1 Jahr', conditions: 'Einlagensicherung Banque Fédérative du Crédit Mutuel bis 100.000 EUR.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Weltsparen / Raisin'), interestRate: 3.600, minInvestment: 5000, maxInvestment: 1000000, durationMonths: 24, description: 'Weltsparen Festgeld 2 Jahre', conditions: 'Zugang zu europäischen Partnerbanken über Raisin-Plattform.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Bigbank'), interestRate: 3.850, minInvestment: 5000, maxInvestment: 500000, durationMonths: 24, description: 'Bigbank Festgeld 24 Monate', conditions: 'Attraktiver Zins für 2-jährige Laufzeit.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('NIBC Direct'), interestRate: 3.700, minInvestment: 5000, maxInvestment: 1000000, durationMonths: 24, description: 'NIBC Direct Festgeld 24 Monate', conditions: 'Stabile Zinsen über 2 Jahre.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Barclays'), interestRate: 3.500, minInvestment: 5000, maxInvestment: 500000, durationMonths: 12, description: 'Barclays Festgeld 1 Jahr', conditions: 'Britische Traditionsbank, EU-Einlagensicherung.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Santander'), interestRate: 3.400, minInvestment: 5000, maxInvestment: 500000, durationMonths: 6, description: 'Santander Festgeld 6 Monate', conditions: 'Kurzfristige Geldanlage mit attraktivem Zins.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Renault Bank direkt'), interestRate: 3.300, minInvestment: 5000, maxInvestment: 500000, durationMonths: 6, description: 'Renault Bank Festgeld 6 Monate', conditions: 'Flexible 6-Monats-Anlage.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Opel Bank'), interestRate: 3.200, minInvestment: 5000, maxInvestment: 250000, durationMonths: 12, description: 'Opel Bank Festgeld 12 Monate', conditions: 'Solide Verzinsung bei Opel Bank.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('ING'), interestRate: 2.750, minInvestment: 5000, durationMonths: 12, description: 'ING Festgeld 1 Jahr', conditions: 'Bekannte Direktbank mit solider Verzinsung.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('DKB'), interestRate: 2.600, minInvestment: 5000, durationMonths: 24, description: 'DKB Festgeld 24 Monate', conditions: 'DKB-Festgeld für Bestandskunden.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Comdirect'), interestRate: 2.500, minInvestment: 5000, durationMonths: 12, description: 'Comdirect Festgeld 1 Jahr', conditions: 'Festgeld über Comdirect-Portal.', isActive: true, isFeatured: false },
    { type: 'tagesgeld', providerId: findProvider('Renault Bank direkt'), interestRate: 3.400, minInvestment: 5000, description: 'Renault Bank Tagesgeld – Top-Zins', conditions: 'Tagesgeld ohne Laufzeit, täglich verfügbar. Mindestanlage 5.000 EUR.', isActive: true, isFeatured: true },
    { type: 'tagesgeld', providerId: findProvider('ING'), interestRate: 3.200, minInvestment: 5000, description: 'ING Extra-Konto Tagesgeld', conditions: 'Flexibles Tagesgeld, täglich kündbar. Für Neukunden erhöhter Aktionszins.', isActive: true, isFeatured: true },
    { type: 'tagesgeld', providerId: findProvider('NIBC Direct'), interestRate: 3.000, minInvestment: 5000, description: 'NIBC Direct Tagesgeld', conditions: 'Attraktives Tagesgeld einer niederländischen Bank.', isActive: true, isFeatured: false },
    { type: 'tagesgeld', providerId: findProvider('DKB'), interestRate: 2.800, minInvestment: 5000, description: 'DKB Cash Tagesgeld', conditions: 'Flexibles Tagesgeld der DKB für Privatkunden.', isActive: true, isFeatured: false },
    { type: 'tagesgeld', providerId: findProvider('Comdirect'), interestRate: 2.600, minInvestment: 5000, description: 'Comdirect Tagesgeld', conditions: 'Comdirect Tagesgeldkonto mit täglicher Verfügbarkeit.', isActive: true, isFeatured: false },
    { type: 'tagesgeld', providerId: findProvider('Santander'), interestRate: 2.500, minInvestment: 5000, description: 'Santander Top-Tagesgeld', conditions: 'Santander Tagesgeld mit wettbewerbsfähigem Zins.', isActive: true, isFeatured: false },
    { type: 'tagesgeld', providerId: findProvider('Weltsparen / Raisin'), interestRate: 2.400, minInvestment: 5000, description: 'Weltsparen Tagesgeld Plus', conditions: 'Europäische Tagesgeld-Produkte über Raisin.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Wamo Bank'), interestRate: 4.150, minInvestment: 5000, maxInvestment: 100000, durationMonths: 12, description: 'Wamo Digital Festgeld', conditions: 'Sichere digitale Anlage aus Malta.', isActive: true, isFeatured: true },
    { type: 'festgeld', providerId: findProvider('Commerzbank'), interestRate: 3.250, minInvestment: 5000, maxInvestment: 1000000, durationMonths: 12, description: 'Commerzbank Klassik Festgeld', conditions: 'Deutsche Sicherheit und Tradition.', isActive: true, isFeatured: false },
    { type: 'tagesgeld', providerId: findProvider('Schwyzer Kantonalbank'), interestRate: 3.100, minInvestment: 5000, description: 'Swiss Flex Tagesgeld', conditions: 'Schweizer Franken oder Euro Anlage möglich.', isActive: true, isFeatured: false },
    { type: 'festgeld', providerId: findProvider('Deutsche Bank'), interestRate: 3.450, minInvestment: 5000, maxInvestment: 500000, durationMonths: 24, description: 'Deutsche Bank ZinsPlus', conditions: 'Exklusive Konditionen für Neukunden.', isActive: true, isFeatured: false },
  ];

  for (const o of offersData) {
    await prisma.offer.create({ data: o });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
