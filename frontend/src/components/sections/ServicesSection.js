// import React from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { useData } from '../../context/DataContext';
// import SectionWrapper from '../common/SectionWrapper';
// import Card from '../common/Card';
// import EmptyState from '../common/EmptyState';
// import { Wrench, Code2, Palette, Smartphone, Globe, Database, Zap } from 'lucide-react';
// import { shouldAnimate } from '../../utils/animations';

// const iconMap = {
//   'web development': Globe,
//   'frontend': Code2,
//   'backend': Database,
//   'mobile': Smartphone,
//   'design': Palette,
//   'ui/ux': Palette,
//   'api': Zap,
//   'consulting': Wrench,
// };

// function getServiceIcon(service) {
//   const title = (service.title || service.name || '').toLowerCase();
//   const category = (service.category || '').toLowerCase();

//   for (const [key, Icon] of Object.entries(iconMap)) {
//     if (title.includes(key) || category.includes(key)) return Icon;
//   }

//   const icons = [Code2, Globe, Palette, Smartphone, Database, Zap, Wrench];
//   const index = (service._id || service.id || 0) % icons.length;
//   return icons[index];
// }

// export default function ServicesSection() {
//   const { services } = useData();
//   const animate = shouldAnimate();
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

//   const servicesList = Array.isArray(services) ? services : [];

//   if (servicesList.length === 0) {
//     return (
//       <SectionWrapper
//         id="services"
//         title="Services"
//         subtitle="What I can do for you."
//       >
//         <EmptyState
//           icon={Wrench}
//           title="No services listed yet"
//           description="Services will appear here once they are added."
//         />
//       </SectionWrapper>
//     );
//   }

//   return (
//     <SectionWrapper
//       id="services"
//       title="Services"
//       subtitle="What I can do for you."
//     >
//       <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {servicesList.map((service, index) => {
//           const Icon = getServiceIcon(service);
//           const title = service.title || service.name || 'Service';
//           const description = service.description || service.summary || '';
//           const price = service.price || service.rate || '';
//           const features = service.features || service.includes || [];

//           return (
//             <motion.div
//               key={service._id || service.id || index}
//               initial={animate ? { opacity: 0, y: 30 } : undefined}
//               animate={inView ? { opacity: 1, y: 0 } : undefined}
//               transition={{ duration: 0.5, delay: index * 0.08 }}
//             >
//               <Card className="h-full flex flex-col">
//                 {/* Icon */}
//                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-4">
//                   <Icon className="w-6 h-6 text-indigo-400" />
//                 </div>

//                 {/* Title & Price */}
//                 <div className="flex items-start justify-between gap-2 mb-2">
//                   <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
//                   {price && (
//                     <span className="text-sm font-medium text-indigo-300 whitespace-nowrap">{price}</span>
//                   )}
//                 </div>

//                 {/* Description */}
//                 {description && (
//                   <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{description}</p>
//                 )}

//                 {/* Features list */}
//                 {features.length > 0 && (
//                   <ul className="space-y-2 border-t border-white/5 pt-4">
//                     {features.map((feature, i) => (
//                       <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
//                         <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
//                         <span>{typeof feature === 'string' ? feature : feature.title || feature.text || ''}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </Card>
//             </motion.div>
//           );
//         })}
//       </div>
//     </SectionWrapper>
//   );
// }
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useData } from '../../context/DataContext';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { Wrench, Code2, Palette, Smartphone, Globe, Database, Zap } from 'lucide-react';
import { shouldAnimate } from '../../utils/animations';

const iconMap = {
  'web development': Globe,
  'frontend': Code2,
  'backend': Database,
  'mobile': Smartphone,
  'design': Palette,
  'ui/ux': Palette,
  'api': Zap,
  'consulting': Wrench,
};

function getServiceIcon(service) {
  const title = (service.title || service.name || '').toLowerCase();
  const category = (service.category || '').toLowerCase();

  for (const [key, Icon] of Object.entries(iconMap)) {
    if (title.includes(key) || category.includes(key)) return Icon;
  }

  const icons = [Code2, Globe, Palette, Smartphone, Database, Zap, Wrench];
  // Use string hash to get a stable index (service._id is an ObjectId, not a number)
  const str = String(service._id || service.id || 'default');
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash) + str.charCodeAt(i);
  const index = Math.abs(hash) % icons.length;
  return icons[index];
}

export default function ServicesSection() {
  const { services } = useData();
  const animate = shouldAnimate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const servicesList = Array.isArray(services) ? services : [];

  if (servicesList.length === 0) {
    return (
      <SectionWrapper
        id="services"
        title="Services"
        subtitle="What I can do for you."
      >
        <EmptyState
          icon={Wrench}
          title="No services listed yet"
          description="Services will appear here once they are added."
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="services"
      title="Services"
      subtitle="What I can do for you."
    >
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((service, index) => {
          const Icon = getServiceIcon(service);
          const title = service.title || service.name || 'Service';
          const description = service.description || service.summary || '';
          const price = service.price || service.rate || '';
          const features = service.features || service.includes || [];

          return (
            <motion.div
              key={service._id || service.id || index}
              initial={animate ? { opacity: 0, y: 30 } : undefined}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>

                {/* Title & Price */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                  {price && (
                    <span className="text-sm font-medium text-indigo-300 whitespace-nowrap">{price}</span>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{description}</p>
                )}

                {/* Features list */}
                {features.length > 0 && (
                  <ul className="space-y-2 border-t border-white/5 pt-4">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        <span>{typeof feature === 'string' ? feature : feature.title || feature.text || ''}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
