<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $config = [
            'theme' => [
                'primaryColor' => '#D4AF37', // Gold
                'backgroundColor' => '#000000',
                'textColor' => '#FFFFFF',
                'accentColor' => '#E5C185',
            ],
            'sections' => [
                [
                    'id' => 'hero',
                    'type' => 'hero',
                    'label' => 'Enter',
                    'visible' => true,
                    'content' => [
                        'badge' => 'Dubai · GCC · Established excellence',
                        'title' => 'Where Luxury <em class="italic text-gold">Finds</em> Its Voice',
                        'description' => 'A regional force redefining bespoke luxury in the GCC.',
                        'buttonText' => 'Enter the Experience'
                    ]
                ],
                [
                    'id' => 'about',
                    'type' => 'about',
                    'label' => 'Identity',
                    'visible' => true,
                    'content' => [
                        'title' => 'A <em class="italic text-gold">Gateway</em>, <br /><span class="opacity-50">not a doorway.</span>',
                        'subtitle' => 'Redefining luxury management through clinical precision and creative excellence across the GCC.',
                        'body1' => 'Divine Management Group is a multi-disciplinary, luxury-driven powerhouse based in Dubai, UAE, operating throughout the GCC and MENA regions.',
                        'body2' => 'The group acts as a comprehensive gateway for luxury brands to enter, grow, and lead in regional and global markets through strategy, innovation, and regulatory compliance.',
                        'founderName' => 'Hanin Elsayed',
                        'founderRole' => 'Entrepreneur · Pharmaceutical Expert · Precision Luxury',
                        'founderSignature' => 'H. Elsayed'
                    ]
                ],
                [
                    'id' => 'compliance',
                    'type' => 'service',
                    'label' => 'Compliance',
                    'visible' => true,
                    'content' => [
                        'number' => '02',
                        'division' => 'Divine Compliance',
                        'title' => 'Regulatory & Product Registration',
                        'focus' => 'Securing a brand\'s legal future through market access and compliance.',
                        'body' => 'Complete regulatory lifecycle management for cosmetic, wellness, and pharmaceutical products in the UAE and GCC.',
                        'services' => [
                            "Product registration (MOH, SFDA, Municipality)",
                            "Consultancy for supplements & pharma",
                            "Licensing & Quality Management",
                            "Storage & Logistics (Licensed Warehouse)",
                            "ECTD file preparation & maintenance",
                        ],
                        'sectors' => [
                            "Pharmaceuticals", "Medical Devices", "OTC", "Cosmetics", "Supplements", "Food & Beverage"
                        ],
                        'align' => 'left',
                        'accentColor' => '#E5C185',
                        'layout' => 'split'
                    ]
                ],
                [
                    'id' => 'influence',
                    'type' => 'service',
                    'label' => 'Influence',
                    'visible' => true,
                    'content' => [
                        'number' => '03',
                        'division' => 'Divine Influence',
                        'title' => 'Medical & Lifestyle Marketing',
                        'focus' => 'Strategic influencer campaigns divided into Medical and Lifestyle categories.',
                        'body' => 'Building bridges between brands and their ideal audiences through high-tier celebrity collaborations and niche community activations.',
                        'services' => [
                            "Celebrity & VIP Campaign Management",
                            "Micro & Community Activations",
                            "Medical Marketing (HCP targeting)",
                            "In-hospital Awareness & Activations",
                            "Luxury Performance Analytics",
                        ],
                        'align' => 'right',
                        'accentColor' => '#D4AF37',
                        'layout' => 'split'
                    ]
                ],
                [
                    'id' => 'circle',
                    'type' => 'service',
                    'label' => 'Circle',
                    'visible' => true,
                    'content' => [
                        'number' => '04',
                        'division' => 'Divine Circle',
                        'title' => 'UHNWI Private Platform',
                        'focus' => 'Invitation-only platform connecting luxury brands with affluent investors.',
                        'body' => 'An exclusive ecosystem designed for maximum impact, offering direct entry to a network of premium luxury buyers and collectors.',
                        'services' => [
                            "Exclusive Membership Access",
                            "Luxury Product Placement",
                            "Immersive VR Experiences",
                            "Exclusive Brand Representation",
                            "Sales Facilitation & Commission",
                        ],
                        'align' => 'left',
                        'accentColor' => '#D4AF37',
                        'layout' => 'heroic'
                    ]
                ],
                [
                    'id' => 'moments',
                    'type' => 'service',
                    'label' => 'Moments',
                    'visible' => true,
                    'content' => [
                        'number' => '05',
                        'division' => 'Divine Moments',
                        'title' => 'Luxury Event Creation',
                        'focus' => 'Crafting high-end, unforgettable brand experiences and legacies.',
                        'body' => 'From private gatherings to immersive brand launches, we handle every detail with elegant design and professional precision.',
                        'services' => [
                            "Custom Concept & Design",
                            "Private Suhoors & VIP Launches",
                            "Experiential Activations",
                            "Guest List & VIP Management",
                            "Full On-site Coordination",
                        ],
                        'align' => 'right',
                        'accentColor' => '#D4AF37',
                        'layout' => 'split'
                    ]
                ],
                [
                    'id' => 'formulations',
                    'type' => 'service',
                    'label' => 'Formulations',
                    'visible' => true,
                    'content' => [
                        'number' => '06',
                        'division' => 'Divine Formulations',
                        'title' => 'Product Creation',
                        'focus' => 'Partnering with medical experts to co-create unique, credible product lines.',
                        'body' => 'Managing the entire lifecycle from formula design and ingredient sourcing to manufacturing and market launch.',
                        'services' => [
                            "Custom Line Creation",
                            "Formula Design & Quality Testing",
                            "Ingredient Sourcing",
                            "Manufacturing & Compliance",
                            "Market Launch Support",
                        ],
                        'align' => 'left',
                        'accentColor' => '#D4AF37',
                        'layout' => 'center-grid'
                    ]
                ],
                [
                    'id' => 'contact',
                    'type' => 'contact',
                    'label' => 'Contact',
                    'visible' => true,
                    'content' => [
                        'number' => '07',
                        'title' => 'Where luxury <br /><em class="italic text-gold">meets excellence.</em>',
                        'email' => 'Hanin@divinemanagement.org',
                        'phone' => '+971 050 711 5315',
                        'instagram' => '@divinemanagement_',
                        'instagramUrl' => 'https://instagram.com/divinemanagement_'
                    ]
                ]
            ]
        ];

        \App\Models\SiteConfig::updateOrCreate(
            ['key' => 'homepage'],
            ['value' => $config]
        );
    }
}
