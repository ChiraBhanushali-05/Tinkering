"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

// Filtered dropdowns to include only the needed items
const dropdowns = [
  {
    buttonLabel: 'Webinar & Expert Session',
    items: [
      { label: 'Upcoming Webinar', href: '/UpcomingWebinar' },
      // { label: 'Upcoming Expression', href: '/UpcomingExpression' },
      
      // { label: 'Past Expression', href: '/PastExpression' },
    ],
  },
  {
    buttonLabel: 'Workshops',
    items: [
      { label: 'Upcoming Workshop', href: '/UpcomingWorkshop' },
      { label: 'Past Workshops Videos', href: '/PastWorkshopsVideos' },
    ],
  },
  {
    buttonLabel: 'Project Mentoring ',
    items: [
      { label: 'Peach Project', href: '/PeachProject' },
      
      // { label: 'Past Internship Experience', href: '/PastInternshipExperience' },
    ],
  },
  {
    buttonLabel: 'Internships',
    items: [
     
      { label: 'Open Internship', href: '/OpenInternship' },
      // { label: 'Past Internship Experience', href: '/PastInternshipExperience' },
    ],
  },
  // {
  //   buttonLabel: 'Training & Workshop Session',
  //   items: [
  //     { label: 'Upcoming Training', href: '/UpcomingTraining' },
  //     { label: 'Past Workshops', href: '/PastWorkshops' },
  //   ],
  // },
  {
    buttonLabel: 'Futurestic Labs',
    items: [
      { label: 'Book The Lab', href: '/Lab' },
    ],
  },
];

export default function MultiDropdowns() {
  const router = useRouter();

  const handleNavigation = (href) => {
    router.push(href);
  };

  return (
    <div className="w-full pb-12 bg-primary_color2 mt-2">
      {/* Container to align all dropdowns in one line */}
      <div className="flex flex-wrap justify-center gap-4 py-2">
        {dropdowns.map((dropdown, index) => (
          <div key={index} className="dropdown dropdown-hover border border-gray-300 rounded-lg">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-primary_color2 text-black shadow-lg dark:shadow-gray-300 hover:bg-primary_color1 hover:text-black transition-colors border border-gray-300 rounded-lg"
            >
              {dropdown.buttonLabel} <ChevronDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-primary_color2 text-black rounded-box z-50 w-52 p-2 shadow border border-gray-300"
>

              {dropdown.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    className="hover:bg-primary_color1 hover:text-black transition-colors"
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}