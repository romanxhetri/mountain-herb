
import React, { useState } from 'react';
import { CheckCircle, Shield, Target, Users, ChevronDown, ChevronUp, MessageCircle, Quote } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const About: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Are your products truly organic?",
      answer: "Yes, all our products are sourced directly from certified organic farms and wild collection sites in the Himalayas. We strictly avoid chemicals and pesticides."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we offer worldwide shipping. Shipping costs and times vary depending on your location. Please check our shipping policy for more details."
    },
    {
      question: "What is the delivery time within Nepal?",
      answer: "For Kathmandu valley, we usually deliver within 24 hours. For major cities outside the valley, it takes 2-3 business days."
    },
    {
      question: "How do I use Shilajit?",
      answer: "Take a pea-sized amount (300-500mg) and dissolve it in hot water, tea, or milk. It is best consumed in the morning on an empty stomach."
    },
    {
      question: "Is there a return policy?",
      answer: "We have a 7-day return policy for damaged or incorrect products. Please retain the original packaging and contact our support team immediately."
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Header Banner */}
      <div className="relative bg-stone-900 text-white py-32">
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2000&q=80" 
            alt="Himalayan Mountains" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl md:text-2xl text-stone-200 font-light max-w-2xl mx-auto">Bridging the gap between ancient Himalayan wisdom and modern wellness.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Main Introduction - Expanded */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <div className="animate-fade-in-up delay-100">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2 block">Who We Are</span>
            <h2 className="text-4xl font-bold text-stone-900 mb-8 leading-tight">Authentic. Ethical. <br/>Purely Himalayan.</h2>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
                <p>
                  Mountain Herbs Nepal was born not in a boardroom, but on the rugged trails of the Dolpo and Mustang regions. We are a collective of local harvesters, traditional healers, and modern wellness advocates dedicated to bringing the pristine gifts of the Himalayas to the world.
                </p>
                <p>
                  For centuries, the indigenous communities of Nepal have used herbs like Yarsagumba, Jatamansi, and the potent Shilajit resin to heal ailments and boost vitality. However, as the world modernized, these ancient secrets faced the threat of dilution through mass production and chemical processing.
                </p>
                <p>
                  We stood against this. We established Mountain Herbs Nepal with a single promise: <strong>Zero Compromise on Purity.</strong> Every jar of Shilajit we sell is sun-dried and purified using the traditional <em>Surya Tapi</em> method, ensuring that the bioactive compounds remain intact.
                </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px] animate-fade-in-up delay-200 group">
            <img src="https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?auto=format&fit=crop&w=1000&q=80" alt="Himalayan Nature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <p className="font-serif text-2xl italic">"From the heart of the mountains, directly to your home."</p>
                </div>
            </div>
          </div>
        </div>

        {/* New Section: The Journey / Sourcing */}
        <div className="mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-stone-900 font-serif">The Journey of Potency</h2>
                <div className="h-1 w-20 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
                <p className="mt-4 text-stone-500 max-w-2xl mx-auto">From the dizzying heights of the Himalayas to your doorstep, our process is a labor of love and precision.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        title: "The Harvest",
                        desc: "Our journey begins at 16,000+ feet. Local expert climbers trek through treacherous terrain in the high Himalayas during the summer months to hand-collect the raw Shilajit resin oozing from the rocks.",
                        img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        title: "Purification",
                        desc: "Raw resin is dissolved in pure glacial water and filtered through seven layers of cotton cloth to remove impurities. It is then sun-dried for weeks—never boiled—to preserve fulvic acid and minerals.",
                        img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        title: "Lab Testing",
                        desc: "Before it reaches you, every batch undergoes rigorous testing for heavy metals and microbial safety in government-certified laboratories in Kathmandu.",
                        img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
                    }
                ].map((step, i) => (
                    <div key={i} className="group bg-stone-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col">
                        <div className="h-56 overflow-hidden relative">
                             <div className="absolute top-4 left-4 h-10 w-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center font-bold text-xl text-emerald-600 shadow-lg z-10">
                                {i+1}
                             </div>
                            <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8 flex-1">
                            <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                            <p className="text-stone-600 leading-relaxed text-sm">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Community Impact Section (New) */}
        <div className="bg-stone-900 text-stone-300 rounded-[3rem] p-10 md:p-20 mb-32 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-20">
                 <img src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover grayscale" alt="Background" />
             </div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                     <span className="text-emerald-500 font-bold uppercase tracking-wider text-xs mb-2 block">Sustainable Livelihood</span>
                     <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">Empowering Communities</h2>
                     <p className="text-lg leading-relaxed mb-6 font-light">
                         We believe that the best products come from happy hands. In the remote villages of Nepal, economic opportunities are scarce. By directly partnering with local foragers and farmers, we eliminate middlemen.
                     </p>
                     <p className="text-lg leading-relaxed mb-8 font-light">
                         We pay fair, above-market wages that enable our partners to send their children to school and invest in their local infrastructure. When you buy from Mountain Herbs Nepal, you aren't just buying a product; you are supporting an entire ecosystem of sustainable livelihood.
                     </p>
                     <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                         <div>
                             <p className="text-4xl font-bold text-emerald-500">500+</p>
                             <p className="text-sm uppercase tracking-wider mt-1 text-stone-400">Families Supported</p>
                         </div>
                         <div>
                             <p className="text-4xl font-bold text-emerald-500">2%</p>
                             <p className="text-sm uppercase tracking-wider mt-1 text-stone-400">Revenue to Education</p>
                         </div>
                     </div>
                 </div>
                 <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative">
                     <Quote className="h-10 w-10 text-emerald-500 mb-4 opacity-50 absolute top-6 right-6" />
                     <p className="text-xl italic text-white mb-6 leading-relaxed relative z-10">
                         "Before Mountain Herbs, we had to travel days to sell our harvest at low prices. Now, they come to us, pay fairly, and treat us with respect. My daughter is the first in our family to attend college."
                     </p>
                     <div className="flex items-center gap-4">
                         <div className="h-12 w-12 bg-stone-700 rounded-full flex items-center justify-center font-bold text-stone-400 border border-white/10">P</div>
                         <div>
                             <p className="font-bold text-white">Pasang Sherpa</p>
                             <p className="text-xs text-stone-400 uppercase tracking-wide">Head Forager, Dolpo</p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="bg-stone-50 p-10 rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-emerald-600">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Mission</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              To promote holistic wellness by providing 100% natural and organic Himalayan products while empowering local communities through sustainable trade. We strive to be the most trusted source of Himalayan herbs globally.
            </p>
          </div>
          <div className="bg-stone-50 p-10 rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-emerald-600">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Vision</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              To see a world where natural healing is accessible to everyone. We envision Mountain Herbs Nepal as a global ambassador for the richness of Nepal's biodiversity and the efficacy of Ayurveda.
            </p>
          </div>
        </div>

        {/* CEO Section */}
        <div className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 mb-32 text-white relative overflow-hidden shadow-2xl">
           {/* Background Pattern */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
           
           <div className="flex-1 relative z-10">
             <div className="inline-block bg-emerald-800/50 px-4 py-1 rounded-full text-emerald-300 font-bold text-sm mb-6 border border-emerald-700">From the Founder</div>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">"Nature is the best physician. We just bring its medicine to you."</h2>
             <p className="text-emerald-100 italic mb-10 text-lg leading-relaxed font-light">
               Growing up in the lap of the Himalayas, I witnessed the healing power of nature firsthand. Mountain Herbs Nepal is not just a business; it's a tribute to our ancestors and a commitment to sharing Nepal's natural gifts with the world.
             </p>
             <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div>
                   <p className="font-bold text-white text-xl">Dinesh Timalsina</p>
                   <p className="text-emerald-400">CEO & Founder</p>
                </div>
                <div className="hidden sm:block h-10 w-px bg-emerald-700"></div>
                <a 
                  href="https://wa.me/9779823376110" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-emerald-900 rounded-full hover:bg-emerald-50 transition-colors shadow-lg font-bold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" /> 
                  Chat on WhatsApp
                </a>
             </div>
           </div>
           <div className="flex-shrink-0 relative z-10">
             <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" alt="Dinesh Timalsina" className="w-64 h-64 rounded-full border-4 border-white/20 shadow-2xl object-cover relative z-10" />
             </div>
           </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-stone-500">Everything you need to know about our products and services.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-stone-200 rounded-2xl overflow-hidden bg-white hover:border-emerald-200 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left bg-white transition-colors focus:outline-none group"
                >
                  <span className={`font-bold text-lg ${openIndex === index ? 'text-emerald-700' : 'text-stone-800'} group-hover:text-emerald-700 transition-colors`}>{faq.question}</span>
                  {openIndex === index ? <ChevronUp className="h-5 w-5 text-emerald-600" /> : <ChevronDown className="h-5 w-5 text-stone-400 group-hover:text-emerald-600" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-stone-600 leading-relaxed bg-white text-lg">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
