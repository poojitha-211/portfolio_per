import { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const skills = [
  { name: 'Python', level: 85, category: 'Backend' },
  { name: 'JavaScript', level: 80, category: 'Frontend' },
  { name: 'HTML & CSS', level: 90, category: 'Frontend' },
  { name: 'C Programming', level: 75, category: 'Backend' },
  { name: 'Machine Learning', level: 78, category: 'Data Science' },
  { name: 'NumPy & Pandas', level: 80, category: 'Data Science' },
  { name: 'IoT & Embedded Systems', level: 70, category: 'Hardware' },
  { name: 'Streamlit', level: 75, category: 'Frontend' },
];

const education = [
  {
    degree: 'B.Tech - Computer Science Engineering',
    institution: 'International School of Technology and Sciences for Women',
    period: '2022 – 2027',
    location: 'Andhra Pradesh, India',
    gpa: '',
    highlights: ['Graduating 2027', 'Strong Technical Foundation', 'Continuous Learning'],
  },
  {
    degree: 'Diploma - Electronic Communication Engineering',
    institution: 'Government Polytechnic for Women, Guntur',
    period: '2019 – 2022',
    location: 'Guntur, Andhra Pradesh',
    gpa: '',
    highlights: ['Electronics Foundation', 'Communication Systems', 'Technical Excellence'],
  },
];

const categoryColors: Record<string, string> = {
  Frontend: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
  Backend: 'text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30',
  'Data Science': 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
  Hardware: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
  DevOps: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30',
};

function SkillBar({ name, level, category }: { name: string; level: number; category: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(level); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-surface-800 dark:text-surface-200">{name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[category]}`}>
            {category}
          </span>
        </div>
        <span className="text-sm font-semibold gradient-text">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            A driven CS student passionate about building impactful software and continuously learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio + Education */}
          <div className="space-y-8">
            <div className="card">
              <p className="text-surface-700 dark:text-surface-300 leading-relaxed text-lg">
                I'm a B.Tech Computer Science student with strong technical skills and a passion for innovation.
                My expertise spans web development, machine learning, and embedded systems with hands-on experience
                in building real-world applications and IoT solutions.
              </p>
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed mt-4">
                Currently pursuing my degree while working on diverse projects ranging from fraud detection models
                to smart home automation systems. I'm committed to continuous learning and applying my skills to solve
                practical problems across different technology domains.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Projects Built', value: '2+' },
                  { label: 'Certifications', value: '9' },
                  { label: 'Internships', value: '1+' },
                  { label: 'Skills', value: '8+' },
                ].map(stat => (
                  <div key={stat.label} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-surface-500 dark:text-surface-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-surface-800 dark:text-surface-200 mb-4 flex items-center gap-2">
                <GraduationCap className="text-primary-500" size={22} />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.degree} className="card">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h4 className="font-bold text-surface-900 dark:text-surface-100">{edu.degree}</h4>
                        <p className="text-primary-600 dark:text-primary-400 font-semibold mt-1">{edu.institution}</p>
                      </div>
                      <span className="tag text-xs shrink-0">{edu.gpa} GPA</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-surface-500 dark:text-surface-400">
                      <span className="flex items-center gap-1"><Calendar size={13} />{edu.period}</span>
                      <span className="flex items-center gap-1"><MapPin size={13} />{edu.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {edu.highlights.map(h => (
                        <span key={h} className="text-xs px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-bold text-surface-800 dark:text-surface-200 mb-6">Technical Skills</h3>
            <div className="card space-y-6">
              {skills.map(skill => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
