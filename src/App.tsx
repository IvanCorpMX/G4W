import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Phone, 
  Globe,
  Menu,
  X,
  ShieldCheck,
  BarChart3,
  Scale,
  ClipboardCheck,
  ArrowLeft,
  MessageCircle,
  Users,
  Calculator,
  PieChart,
  Shield,
  Building,
  Handshake
} from 'lucide-react';

const servicesData = [
  {
    id: 'soluciones-contables-juridicas',
    icon: Scale,
    title: "Soluciones Contables y Jurídicas",
    description: "Transparencia financiera y respaldo legal para sus activos.",
    features: [
      "Recaudación y Cobranza",
      "Contabilidad e Informes Financieros",
      "Bitácora de obligaciones fiscales",
      "Asesoría legal corporativa",
      "Conciliaciones bancarias"
    ],
    details: "La salud financiera y legal de sus activos es nuestra prioridad. Brindamos servicios contables transparentes, asegurando una recaudación eficiente y reportes claros. Además, nuestro equipo jurídico ofrece asesoría especializada protegiendo siempre los intereses de su empresa o propiedad."
  },
  {
    id: 'operacion-gestion-control',
    icon: ClipboardCheck,
    title: "Operación, Gestión y Control",
    description: "Supervisión profesional para garantizar la eficiencia operativa.",
    features: [
      "Supervisión constante a la infraestructura",
      "Elaboración y control de programas operativos",
      "Gestión de contratación y pago a proveedores",
      "Monitoreo constante de activos",
      "Supervisión y control de personal"
    ],
    details: "Nos encargamos de la administración operativa diaria de su propiedad o empresa. Desde la supervisión del personal y proveedores hasta el monitoreo constante de las instalaciones, garantizamos que todo opere de manera fluida y eficiente. Implementamos programas estructurados y llevamos un control riguroso de los recursos para optimizar los costos."
  }
];

const specializedServices = [
  { id: 'gestion-talento', icon: Users, title: 'Gestión de talento', desc: 'Atracción, retención y desarrollo del mejor capital humano para su empresa.' },
  { id: 'manejo-nomina', icon: Calculator, title: 'Manejo de nómina', desc: 'Administración precisa y puntual de las obligaciones laborales y salariales.' },
  { id: 'contabilidad', icon: PieChart, title: 'Contabilidad', desc: 'Control financiero riguroso para la toma de decisiones estratégicas.' },
  { id: 'registro-marcas', icon: Shield, title: 'Registro de marcas', desc: 'Protección legal y resguardo de la identidad y propiedad intelectual de su negocio.' },
  { id: 'administracion-inmuebles', icon: Building, title: 'Administración de inmuebles', desc: 'Gestión integral para maximizar el valor y la rentabilidad de sus propiedades.' },
];

const heroImages = [
  { src: "/hero-1.webp", fallback: "https://picsum.photos/seed/condominium/800/1000" },
  { src: "/hero-2.webp", fallback: "https://picsum.photos/seed/officebuilding/800/1000" },
  { src: "/hero-3.webp", fallback: "https://picsum.photos/seed/industrial/800/1000" },
  { src: "/hero-4.webp", fallback: "https://picsum.photos/seed/residential/800/1000" }
];

const ScrollToAnchor = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Nosotros', href: '/#nosotros' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="G4W Go For Work" 
                className="h-10 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <>
                <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G4</span>
                </div>
                <span className="text-2xl font-bold tracking-tight text-brand-dark">
                  W <span className="text-brand-green font-medium">Go For Work</span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-600 hover:text-brand-green transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/#contacto"
              onClick={(e) => handleNavClick(e, '/#contacto')}
              className="bg-brand-green text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-all shadow-sm"
            >
              Solicitar Cotización
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-brand-green border-b border-slate-50"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/#contacto"
                  onClick={(e) => handleNavClick(e, '/#contacto')}
                  className="block w-full text-center bg-brand-green text-white px-5 py-3 rounded-xl text-base font-semibold"
                >
                  Solicitar Cotización
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ id, icon: Icon, title, description, features, index = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="h-full"
  >
    <Link to={`/servicio/${id}`} className="block h-full">
      <motion.div 
        whileHover={{ y: -5 }}
        className="h-full p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-green/20 transition-all group flex flex-col relative overflow-hidden"
      >
        <div className="w-14 h-14 bg-brand-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-green transition-colors">
          <Icon className="text-brand-green group-hover:text-white transition-colors" size={28} />
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-3">{title}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.slice(0, 3).map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-500">
              <CheckCircle2 size={16} className="text-brand-green mt-0.5 shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
          {features.length > 3 && (
            <li className="text-sm text-brand-green font-medium italic">
              + {features.length - 3} servicios más...
            </li>
          )}
        </ul>
        <div className="mt-auto flex items-center text-brand-green font-semibold text-sm group-hover:translate-x-2 transition-transform">
          Ver más información <ArrowRight size={16} className="ml-2" />
        </div>
      </motion.div>
    </Link>
  </motion.div>
);

const Home = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-green/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light border border-brand-green/20 text-brand-green text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck size={14} />
                Servicio Integral de Administración de Activos
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-brand-dark leading-[1.1] mb-6">
                Nos encargamos de todo.
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Optimizamos la gestión de sus recursos para que usted se enfoque en la <span className="font-bold text-brand-green">rentabilidad y crecimiento</span> de su negocio.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-brand-green text-white rounded-full font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand-green/20 flex items-center gap-2"
                >
                  Empezar ahora <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
                >
                  Ver servicios
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
                <div>
                  <div className="text-2xl font-bold text-brand-dark">100%</div>
                  <div className="text-sm text-slate-500">Gestión Profesional</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <div className="text-2xl font-bold text-brand-dark">24/7</div>
                  <div className="text-sm text-slate-500">Supervisión Operativa</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white aspect-[4/5]">
                <AnimatePresence>
                  <motion.img 
                    key={currentImg}
                    src={heroImages[currentImg].src}
                    onError={(e) => { e.currentTarget.src = heroImages[currentImg].fallback; }}
                    alt="Gestión Profesional" 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent z-10" />
                <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white shrink-0">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <div className="text-brand-dark font-bold leading-tight mb-1">Residencial, Comercial e Industrial</div>
                      <div className="text-slate-600 text-sm font-medium">Maximizamos el valor de sus activos.</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-green/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-green/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="section-padding overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/about-1.webp" 
                  onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/house/400/500"; }}
                  alt="Propiedad" 
                  className="rounded-2xl shadow-lg mt-8 object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="/about-2.webp" 
                  onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/maintenance/400/500"; }}
                  alt="Mantenimiento" 
                  className="rounded-2xl shadow-lg object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-green/5 rounded-full blur-3xl" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-brand-green font-bold text-sm uppercase tracking-[0.2em] mb-4">En Go For Work</h2>
              <h3 className="text-4xl font-bold text-brand-dark mb-6">Especialistas en la administración de activos</h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Aprovechamos al máximo los recursos con el fin de mejorar la rentabilidad y el valor de sus propiedades y negocios.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-brand-light rounded-full flex items-center justify-center text-brand-green">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark mb-1">Aumento de Plusvalía</h4>
                    <p className="text-slate-500">Cuidamos su propiedad con el fin de mantener y aumentar el valor de sus activos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-brand-light rounded-full flex items-center justify-center text-brand-green">
                    <ClipboardCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark mb-1">Gestión Integral</h4>
                    <p className="text-slate-500">Ofrecemos administración y control operativo de primer nivel.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-brand-light rounded-full flex items-center justify-center text-brand-green">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark mb-1">Cobertura Total</h4>
                    <p className="text-slate-500">Los servicios que prestamos son de tipo residencial, comercial e industrial.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-brand-green font-bold text-sm uppercase tracking-[0.2em] mb-4">Nos Encargamos De</h2>
            <h3 className="text-4xl font-bold text-brand-dark mb-6">Nuestros Servicios</h3>
            <p className="text-slate-600 text-lg">
              Soluciones integrales para el correcto funcionamiento y conservación de sus activos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} index={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section id="especializados" className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-brand-green font-bold text-sm uppercase tracking-[0.2em] mb-4">Soluciones a la medida</h2>
            <h3 className="text-4xl font-bold text-brand-dark mb-6">Servicios Especializados</h3>
            <p className="text-slate-600 text-lg">
              Experiencia y profesionalismo en áreas clave para el desarrollo y protección de su empresa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {specializedServices.map((srv, idx) => (
              <motion.div 
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-green/20 transition-all text-center group"
              >
                <div className="w-14 h-14 mx-auto bg-brand-light rounded-xl flex items-center justify-center mb-5 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                  <srv.icon size={28} />
                </div>
                <h4 className="font-bold text-brand-dark mb-3 leading-tight">{srv.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRG Synergy Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-brand-dark rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 skew-x-12 translate-x-1/4" />
            
            <div className="relative z-10 md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-light text-xs font-bold uppercase tracking-wider mb-6">
                <Handshake size={14} />
                Alianza Estratégica
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Sinergia con CRG Seguros y Fianzas</h3>
              <p className="text-brand-light/80 text-lg mb-8 max-w-2xl leading-relaxed">
                Trabajamos en conjunto con CRG para brindar un respaldo sólido y protección integral a sus activos. Aseguramos la tranquilidad de sus operaciones con soluciones a la medida.
              </p>
              <a 
                href="https://crg.com.mx/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-white rounded-full font-bold text-lg hover:bg-white hover:text-brand-dark transition-all shadow-lg"
              >
                Conocer más sobre CRG <ArrowRight size={20} />
              </a>
            </div>
            
            <div className="relative z-10 md:w-1/3 flex justify-center">
               <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-2xl backdrop-blur-sm">
                  <Shield size={72} className="text-brand-green" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-green text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-dark/10 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">¿Listo para maximizar el valor de sus activos?</h2>
              <p className="text-white/90 text-lg mb-8">
                Contáctenos hoy mismo y descubra cómo podemos ayudarle a optimizar la gestión y rentabilidad de su propiedad o negocio.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/529996490236?text=Hola,%20me%20gustaría%20recibir%20más%20información%20sobre%20sus%20servicios." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-white hover:text-brand-dark transition-all inline-flex items-center gap-2 shadow-xl"
                >
                  <MessageCircle size={20} /> Contactar por WhatsApp
                </a>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <span className="font-medium">999 649 0236</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-brand-green font-bold text-sm uppercase tracking-[0.2em] mb-4">Contacto</h2>
              <h3 className="text-4xl font-bold text-brand-dark mb-6">Hablemos de su proyecto</h3>
              <p className="text-slate-600 mb-8">
                Estamos listos para escuchar sus necesidades y proponer una solución a la medida.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-brand-light rounded-xl flex items-center justify-center text-brand-green">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Teléfono</div>
                    <div className="text-brand-dark font-bold">999 649 0236</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-brand-light rounded-xl flex items-center justify-center text-brand-green">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Sitio Web</div>
                    <div className="text-brand-dark font-bold">www.g4w.mx</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-brand-light rounded-xl flex items-center justify-center text-brand-green">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Email</div>
                    <div className="text-brand-dark font-bold">ventas@g4w.mx</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-2 md:p-4 rounded-3xl border border-slate-100 shadow-xl h-[600px] overflow-hidden">
                {/* 
                  =======================================================================
                  CAMBIAR ENLACE DE BOOKINGS AQUÍ
                  =======================================================================
                  Para poner el enlace definitivo en el futuro, simplemente reemplaza 
                  la URL que está dentro del atributo 'src' del iframe de abajo.
                */}
                <iframe
                  src="https://outlook.office.com/bookwithme/user/d60d482122d6426d8e38f7285ba9b2a7@corp-mx.com?anonymous&ep=plink"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Agendar cita"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Servicio no encontrado</h2>
        <Link to="/" className="text-brand-green hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-28 pb-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/#servicios" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-green transition-colors mb-8 font-medium">
          <ArrowLeft size={20} /> Volver a servicios
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-brand-light rounded-2xl flex items-center justify-center shrink-0">
              <Icon className="text-brand-green" size={40} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-brand-dark mb-2">{service.title}</h1>
              <p className="text-xl text-slate-500">{service.description}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-slate-600 mb-12">
            <p className="leading-relaxed">{service.details}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h3 className="text-2xl font-bold text-brand-dark mb-6">¿Qué incluye este servicio?</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={24} className="text-brand-green shrink-0" />
                  <span className="text-slate-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://wa.me/529996490236?text=Hola,%20me%20gustaría%20recibir%20más%20información%20sobre%20sus%20servicios." 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-white rounded-full font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand-green/20"
            >
              <MessageCircle size={20} /> Solicitar Cotización por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  
  return (
  <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="G4W Go For Work" 
                className="h-12 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <>
                <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G4</span>
                </div>
                <span className="text-2xl font-bold tracking-tight text-brand-dark">
                  W <span className="text-brand-green font-medium">Go For Work</span>
                </span>
              </>
            )}
          </div>
          <p className="text-slate-500 max-w-sm mb-8">
            Servicio Integral de Administración de Activos. Optimizamos la gestión de sus recursos para garantizar la máxima rentabilidad y seguridad.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-brand-dark mb-6">Enlaces Rápidos</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-slate-500 hover:text-brand-green transition-colors">Inicio</Link></li>
            <li><Link to="/#nosotros" className="text-slate-500 hover:text-brand-green transition-colors">Nosotros</Link></li>
            <li><Link to="/#servicios" className="text-slate-500 hover:text-brand-green transition-colors">Servicios</Link></li>
            <li><Link to="/#contacto" className="text-slate-500 hover:text-brand-green transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-6">Síguenos</h4>
          <ul className="space-y-4">
            <li><a href="https://www.facebook.com/g4wconsultores" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-brand-green transition-colors">Facebook</a></li>
            <li><a href="https://www.instagram.com/g4wconsultores/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-brand-green transition-colors">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/g4wconsultores/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-brand-green transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} G4W Go For Work México. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <div className="min-h-screen selection:bg-brand-green/20 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicio/:id" element={<ServiceDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
