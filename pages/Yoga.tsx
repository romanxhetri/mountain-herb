
import React, { useState } from 'react';
import { PlayCircle, Calendar, Music, Wind, ArrowRight, Video, Sparkles, UserCheck, ChevronDown, ChevronUp, Clock, Activity, BookOpen, Heart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useData } from '../App';

interface GuideStep {
  title: string;
  description: string;
}

interface Guide {
  id: string;
  title: string;
  sanskritName: string;
  category: 'Asana' | 'Pranayama' | 'Meditation';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  benefits: string[];
  steps: GuideStep[];
}

const PRACTICE_GUIDES: Guide[] = [
  {
    id: 'surya-namaskar',
    title: 'Sun Salutation',
    sanskritName: 'Surya Namaskar',
    category: 'Asana',
    level: 'Beginner',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    benefits: ['Improves flexibility', 'Boosts cardiovascular health', 'Strengthens muscles', 'Reduces stress'],
    steps: [
      { title: 'Pranamasana (Prayer Pose)', description: 'Stand at the edge of your mat, keep your feet together and balance your weight equally on both feet. Expand your chest and relax your shoulders. As you breathe in, lift both arms up from the sides, and as you exhale, bring your palms together in front of the chest in a prayer position.' },
      { title: 'Hastauttanasana (Raised Arms Pose)', description: 'Breathing in, lift the arms up and back, keeping the biceps close to the ears. In this pose, the effort is to stretch the whole body up from the heels to the tips of the fingers.' },
      { title: 'Hastapadasana (Standing Forward Bend)', description: 'Breathing out, bend forward from the waist keeping the spine erect. As you exhale completely, bring the hands down to the floor beside the feet.' },
      { title: 'Ashwa Sanchalanasana (Equestrian Pose)', description: 'Breathing in, push your right leg back, as far back as possible. Bring the right knee to the floor and look up.' },
      { title: 'Dandasana (Stick Pose)', description: 'As you breathe in, take the left leg back and bring the whole body in a straight line.' },
      { title: 'Ashtanga Namaskara (Salute with Eight Parts)', description: 'Gently bring your knees down to the floor and exhale. Take the hips back slightly, slide forward, rest your chest and chin on the floor. Raise your posterior a little bit.' },
      { title: 'Bhujangasana (Cobra Pose)', description: 'Slide forward and raise the chest up into the Cobra pose. You may keep your elbows bent in this pose with the shoulders away from the ears. Look up at the ceiling.' },
      { title: 'Adho Mukha Svanasana (Downward Dog)', description: 'Breathing out, lift the hips and the tailbone up to bring the body into an inverted "V" pose.' },
    ]
  },
  {
    id: 'nadi-shodhana',
    title: 'Alternate Nostril Breathing',
    sanskritName: 'Nadi Shodhana',
    category: 'Pranayama',
    level: 'Beginner',
    duration: '10 mins',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    benefits: ['Calms the nervous system', 'Improves focus', 'Balances brain hemispheres', 'Clears respiratory channels'],
    steps: [
      { title: 'Posture', description: 'Sit comfortably with your spine erect and shoulders relaxed. Place your left hand on the left knee, palms open to the sky.' },
      { title: 'Hand Mudra', description: 'Place the tip of the index finger and middle finger of the right hand in between the eyebrows, the ring finger and little finger on the left nostril, and the thumb on the right nostril.' },
      { title: 'Inhale Left', description: 'Press your thumb down on the right nostril and breathe out gently through the left nostril. Now breathe in from the left nostril.' },
      { title: 'Exhale Right', description: 'Press the left nostril gently with the ring finger and little finger. Removing the right thumb from the right nostril, breathe out from the right.' },
      { title: 'Inhale Right', description: 'Breathe in from the right nostril and exhale from the left. You have now completed one round.' },
      { title: 'Repeat', description: 'Continue inhaling and exhaling from alternate nostrils for 9 rounds.' }
    ]
  },
  {
    id: 'mindfulness',
    title: 'Himalayan Stillness Meditation',
    sanskritName: 'Dhyana',
    category: 'Meditation',
    level: 'Beginner',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=800&q=80',
    benefits: ['Reduces anxiety', 'Promotes emotional health', 'Enhances self-awareness', 'Lengthens attention span'],
    steps: [
      { title: 'Find a Quiet Space', description: 'Sit in a comfortable position, either on a cushion or a chair. Keep your back straight.' },
      { title: 'Close Your Eyes', description: 'Gently close your eyes and take a few deep breaths to settle into your body.' },
      { title: 'Observe the Breath', description: 'Bring your attention to the sensation of breathing. Notice the air moving in and out of your nostrils.' },
      { title: 'Wandering Mind', description: 'Your mind will wander. This is natural. When you notice it has wandered, gently bring your focus back to the breath without judgment.' },
      { title: 'Body Scan', description: 'Slowly move your attention from the top of your head down to your toes, noticing any sensations or tension.' },
      { title: 'Conclusion', description: 'When you are ready, gently wiggle your fingers and toes, and slowly open your eyes.' }
    ]
  },
  {
    id: 'vrikshasana',
    title: 'Tree Pose',
    sanskritName: 'Vrikshasana',
    category: 'Asana',
    level: 'Beginner',
    duration: '5 mins',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/074/107/143/small/fit-woman-in-athletic-wear-doing-tree-pose-yoga-promoting-health-and-mindfulness-photo.jpeg',
    benefits: ['Improves balance', 'Strengthens legs', 'Opens the hips', 'Builds focus'],
    steps: [
        { title: 'Stand Tall', description: 'Begin in Tadasana (Mountain Pose). Stand with feet together, weight evenly distributed.' },
        { title: 'Shift Weight', description: 'Shift your weight slightly onto the left foot, keeping the inner foot firm to the floor.' },
        { title: 'Place Foot', description: 'Bend your right knee and place the sole of your right foot on your left inner thigh. Avoid placing it directly on the knee joint.' },
        { title: 'Find Balance', description: 'Press your foot into your thigh and your thigh into your foot. Bring hands to prayer position at chest.' },
        { title: 'Grow Tall', description: 'Inhale and extend arms overhead. Gaze softly at a fixed point in front of you.' },
        { title: 'Hold', description: 'Hold for 5-10 breaths. Exhale to release and switch sides.' }
    ]
  }
];

export const Yoga: React.FC = () => {
  const { addMessage } = useData();
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', whatsapp: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const toggleGuide = (id: string) => {
      setExpandedGuide(expandedGuide === id ? null : id);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setBookingStatus('loading');
      try {
          await addMessage({
              name: bookingForm.name,
              email: bookingForm.email,
              phone: bookingForm.whatsapp,
              subject: 'Yoga Demo Class Request',
              message: `I am interested in booking a free demo yoga class.\nWhatsApp: ${bookingForm.whatsapp}`
          });
          setBookingStatus('success');
          setBookingForm({ name: '', email: '', whatsapp: '' });
      } catch (err) {
          alert('Something went wrong. Please try again.');
          setBookingStatus('idle');
      }
  };

  const scrollToBooking = () => {
      document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Seo title="Yoga & Meditation" description="Join our Himalayan Yoga sessions, guided meditations, and wellness retreats." />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80" 
            alt="Yoga in Himalayas" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            Mind • Body • Spirit
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif drop-shadow-2xl">
            Himalayan Flow
          </h1>
          <p className="text-xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Reconnect with your inner self through ancient practices rooted in the wisdom of the mountains. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToBooking}
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-all hover:scale-105 shadow-lg shadow-emerald-900/20 flex items-center justify-center"
            >
              <PlayCircle className="mr-2 h-5 w-5" /> Book Free Demo Class
            </button>
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/20 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="h-14 w-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <Video className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Live Classes</h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Join daily live streams with certified instructors from Kathmandu. Hatha, Vinyasa, and Yin styles available.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-stone-500">
              <li className="flex items-center"><UserCheck className="h-4 w-4 mr-2 text-emerald-500"/> Beginner Friendly</li>
              <li className="flex items-center"><Video className="h-4 w-4 mr-2 text-emerald-500"/> HD Streaming</li>
              <li className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-emerald-500"/> Daily Schedules</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-emerald-900/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="h-14 w-14 bg-emerald-800 rounded-2xl flex items-center justify-center text-emerald-300 mb-6 group-hover:scale-110 transition-transform">
              <Wind className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Breath & Meditation</h3>
            <p className="text-emerald-100 mb-6 leading-relaxed">
              Guided Pranayama and meditation sessions to reduce stress and increase mindfulness.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-emerald-200">
              <li className="flex items-center"><Music className="h-4 w-4 mr-2 text-emerald-400"/> Singing Bowls Audio</li>
              <li className="flex items-center"><Wind className="h-4 w-4 mr-2 text-emerald-400"/> Guided Breathing</li>
              <li className="flex items-center"><Sparkles className="h-4 w-4 mr-2 text-emerald-400"/> Sleep Stories</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/20 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Retreats</h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Immersive 7-day retreats in the Pokhara and Mustang regions. Combine trekking with daily yoga practice.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-stone-500">
              <li className="flex items-center"><UserCheck className="h-4 w-4 mr-2 text-amber-500"/> All Inclusive Stay</li>
              <li className="flex items-center"><Video className="h-4 w-4 mr-2 text-amber-500"/> Organic Meals</li>
              <li className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-amber-500"/> Next: Oct 15th</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guides Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
             <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 block">Self Practice</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6">Step-by-Step Guides</h2>
             <p className="text-stone-300 max-w-2xl mx-auto">Master the fundamentals with our detailed tutorials. Perfect for home practice.</p>
        </div>

        <div className="space-y-8">
            {PRACTICE_GUIDES.map((guide) => (
                <div key={guide.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 transition-all duration-300 hover:shadow-2xl">
                    <div 
                        className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row gap-6"
                        onClick={() => toggleGuide(guide.id)}
                    >
                        {/* Thumbnail */}
                        <div className="w-full md:w-48 h-48 md:h-32 rounded-2xl overflow-hidden shrink-0 relative">
                             <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                 {expandedGuide === guide.id ? 
                                    <ChevronUp className="text-white h-10 w-10 opacity-80" /> : 
                                    <PlayCircle className="text-white h-10 w-10 opacity-80" />
                                 }
                             </div>
                        </div>

                        {/* Content Header */}
                        <div className="flex-1">
                             <div className="flex flex-wrap items-center gap-3 mb-2">
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                     guide.category === 'Asana' ? 'bg-orange-100 text-orange-600' : 
                                     guide.category === 'Pranayama' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                 }`}>
                                     {guide.category}
                                 </span>
                                 <span className="flex items-center text-stone-500 text-xs font-bold">
                                     <Clock className="h-3 w-3 mr-1" /> {guide.duration}
                                 </span>
                                 <span className="flex items-center text-stone-500 text-xs font-bold">
                                     <Activity className="h-3 w-3 mr-1" /> {guide.level}
                                 </span>
                             </div>
                             <h3 className="text-2xl font-bold text-stone-900 mb-1">{guide.title}</h3>
                             <p className="text-stone-500 italic mb-4 font-serif">{guide.sanskritName}</p>
                             
                             <div className="flex flex-wrap gap-2">
                                 {guide.benefits.map((benefit, i) => (
                                     <span key={i} className="flex items-center text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                                         <Heart className="h-3 w-3 mr-1" /> {benefit}
                                     </span>
                                 ))}
                             </div>
                        </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedGuide === guide.id && (
                        <div className="px-6 md:px-8 pb-8 pt-2 animate-fade-in border-t border-stone-100 bg-stone-50/50">
                            <h4 className="font-bold text-lg text-stone-800 mb-6 flex items-center mt-6">
                                <BookOpen className="h-5 w-5 mr-2 text-emerald-600" /> Instructions
                            </h4>
                            <div className="space-y-6 relative">
                                {/* Vertical Line for Timeline effect */}
                                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-stone-200 hidden md:block"></div>
                                
                                {guide.steps.map((step, index) => (
                                    <div key={index} className="flex gap-4 relative">
                                        <div className="hidden md:flex h-8 w-8 bg-emerald-600 rounded-full items-center justify-center text-white font-bold text-sm shrink-0 z-10 shadow-md border-2 border-white">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
                                            <h5 className="font-bold text-stone-900 mb-2 flex items-center">
                                                <span className="md:hidden bg-emerald-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center mr-2">{index + 1}</span>
                                                {step.title}
                                            </h5>
                                            <p className="text-stone-600 text-sm leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm italic text-center">
                                Note: Listen to your body. Do not force any pose. Consult a physician before starting any new exercise routine.
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </section>

      {/* Booking Section */}
      <section id="book-demo" className="py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-emerald-900 opacity-90"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
         
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
               <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-stone-900 mb-4 font-serif">Book Your Free Demo Class</h2>
                  <p className="text-stone-600">
                     Experience the healing power of Himalayan Yoga with our expert instructors. Fill out the form below to schedule your complimentary session.
                  </p>
               </div>

               {bookingStatus === 'success' ? (
                   <div className="text-center py-10 animate-fade-in">
                       <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                           <CheckCircle className="h-8 w-8 text-green-600" />
                       </div>
                       <h3 className="text-2xl font-bold text-stone-800 mb-2">Request Received!</h3>
                       <p className="text-stone-600 mb-6">Our team will contact you on WhatsApp shortly to schedule your slot.</p>
                       <button 
                          onClick={() => setBookingStatus('idle')}
                          className="text-emerald-600 font-bold hover:underline"
                       >
                          Book another slot
                       </button>
                   </div>
               ) : (
                   <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
                              <input 
                                  type="text" 
                                  required
                                  value={bookingForm.name}
                                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900"
                                  placeholder="John Doe"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                              <input 
                                  type="email" 
                                  required
                                  value={bookingForm.email}
                                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900"
                                  placeholder="john@example.com"
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-stone-700 mb-2">WhatsApp Number</label>
                          <input 
                              type="tel" 
                              required
                              value={bookingForm.whatsapp}
                              onChange={(e) => setBookingForm({...bookingForm, whatsapp: e.target.value})}
                              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-stone-900"
                              placeholder="+977 98XXXXXXXX"
                          />
                          <p className="text-xs text-stone-500 mt-2 flex items-center">
                              <Video className="h-3 w-3 mr-1" /> We will send the Zoom link to this number.
                          </p>
                      </div>
                      
                      <button 
                          type="submit" 
                          disabled={bookingStatus === 'loading'}
                          className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 disabled:opacity-70"
                      >
                          {bookingStatus === 'loading' ? 'Submitting...' : 'Book My Free Session'}
                      </button>
                   </form>
               )}
            </div>
         </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-emerald-900/30 backdrop-blur-sm border-y border-white/5">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <Sparkles className="h-8 w-8 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-6">
              "Yoga is the journey of the self, through the self, to the self."
            </h2>
            <p className="text-emerald-200 font-bold uppercase tracking-widest text-sm">— The Bhagavad Gita</p>
         </div>
      </section>

    </div>
  );
};
