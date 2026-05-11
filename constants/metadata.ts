import type { Metadata } from 'next';

export const pagesMetadata = {
  home: {
    title: 'El-Shaddai Baptist Schools | Lagos, Nigeria',
    description:
      'Welcome to El-Shaddai Baptist Schools — a leading faith-based institution in Lagos offering quality education rooted in Christian values, academic excellence, and character development.',
    alternates: { canonical: '/' },
    openGraph: {
      title: 'El-Shaddai Baptist Schools | Lagos, Nigeria',
      description:
        'Welcome to El-Shaddai Baptist Schools — quality education rooted in Christian values in Lagos, Nigeria.',
      url: '/',
    },
  },
  about: {
    title: 'About Us',
    description:
      'Learn about El-Shaddai Baptist Schools — our history, guiding principles, leadership, and the vision that has driven academic and moral excellence in Lagos since 1998.',
    alternates: { canonical: '/about' },
    openGraph: {
      title: 'About Us | El-Shaddai Baptist Schools',
      description:
        'Discover our history, values, and the leadership behind El-Shaddai Baptist Schools in Lagos, Nigeria.',
      url: '/about',
    },
  },
  academics: {
    title: 'Academics',
    description:
      'Explore El-Shaddai Baptist Schools\u2019 academic programmes — from nursery through senior secondary. A rigorous, faith-based curriculum preparing students for national and international excellence.',
    alternates: { canonical: '/academics' },
    openGraph: {
      title: 'Academics | El-Shaddai Baptist Schools',
      description:
        'Our academic programmes span nursery through secondary level, combining rigorous study with Christian values.',
      url: '/academics',
    },
  },
  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with El-Shaddai Baptist Schools in Lagos. Reach us for admissions enquiries, general questions, or to schedule a campus visit. We\u2019re here to help.',
    alternates: { canonical: '/contact' },
    openGraph: {
      title: 'Contact Us | El-Shaddai Baptist Schools',
      description:
        'Contact El-Shaddai Baptist Schools for admissions and enquiries. Visit us at Victoria Island, Lagos.',
      url: '/contact',
    },
  },
  gallery: {
    title: 'Gallery',
    description:
      'Browse the El-Shaddai Baptist Schools photo gallery — school events, sports, graduation ceremonies, and everyday campus life in Lagos, Nigeria.',
    alternates: { canonical: '/gallery' },
    openGraph: {
      title: 'Gallery | El-Shaddai Baptist Schools',
      description:
        'Photos from events, sports, and daily life at El-Shaddai Baptist Schools, Lagos.',
      url: '/gallery',
    },
  },
  news: {
    title: 'News & Events',
    description:
      'Stay up to date with the latest news, announcements, and events from El-Shaddai Baptist Schools, Lagos. Competitions, results, and school happenings.',
    alternates: { canonical: '/news' },
    openGraph: {
      title: 'News & Events | El-Shaddai Baptist Schools',
      description:
        'Latest news, announcements, and upcoming events from El-Shaddai Baptist Schools, Lagos.',
      url: '/news',
    },
  },
} satisfies Record<string, Metadata>;
