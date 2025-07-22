import React from 'react';

const healthTips = [
  {
    id: 1,
    icon: '💧',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to keep your body healthy and energized.',
  },
  {
    id: 2,
    icon: '🍎',
    title: 'Healthy Diet',
    description: 'Eat fresh fruits and vegetables daily to maintain balanced nutrition.',
  },
  {
    id: 3,
    icon: '🏃‍♂️',
    title: 'Regular Exercise',
    description: 'Engage in moderate physical activity for at least 30 minutes every day.',
  },
  {
    id: 4,
    icon: '😴',
    title: 'Adequate Sleep',
    description: 'Aim for 7-8 hours of quality sleep each night to boost immunity and mental health.',
  },
  {
    id: 5,
    icon: '🧼',
    title: 'Good Hygiene',
    description: 'Wash your hands frequently and maintain personal hygiene to prevent infections.',
  },
  {
    id: 6,
    icon: '🧘‍♀️',
    title: 'Stress Management',
    description: 'Practice relaxation techniques like meditation or yoga to reduce stress.',
  },
];

const HealthTips = () => {
  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-red-500">
          🩺 Health Tips for You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {healthTips.map(({ id, icon, title, description }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
            >
              <div className="text-6xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
