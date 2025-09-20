import React, { useState, useEffect } from 'react';
import { ChevronRight, Brain, Target, Zap, Users, Star, Check, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "The AI mentor helped me transition from engineering to product management in just 6 months. The personalized guidance was invaluable.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Data Scientist",
      company: "StartupXYZ",
      content: "Having an AI mentor that understands my specific career goals has accelerated my professional growth beyond what I imagined possible.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "UX Designer",
      company: "DesignStudio",
      content: "The personalized learning path and 24/7 availability made all the difference in my career pivot. Highly recommend!",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Personalized AI Training",
      description: "Our AI learns your unique professional background, goals, and challenges to provide tailored guidance."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Oriented Roadmaps",
      description: "Get step-by-step career roadmaps designed specifically for your professional objectives."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Feedback",
      description: "Receive immediate insights and recommendations whenever you need guidance."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Industry Insights",
      description: "Access knowledge from thousands of successful professionals across various industries."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-800/90 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-white font-bold text-xl">AI Mentor</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-cyan-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-cyan-400 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-slate-300 hover:text-cyan-400 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-slate-300 hover:text-cyan-400 transition-colors">Pricing</a>
              <button className="bg-cyan-400 text-slate-900 px-6 py-2 rounded-full hover:bg-cyan-500 transition-all transform hover:scale-105 font-semibold">
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-slate-300 hover:text-cyan-400">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-slate-300 hover:text-cyan-400">How It Works</a>
              <a href="#testimonials" className="block px-3 py-2 text-slate-300 hover:text-cyan-400">Testimonials</a>
              <a href="#pricing" className="block px-3 py-2 text-slate-300 hover:text-cyan-400">Pricing</a>
              <button className="w-full mt-4 bg-cyan-400 text-slate-900 px-6 py-2 rounded-full font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fadeIn">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-lg rounded-full px-4 py-2 mb-8 border border-slate-600">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Personalized AI Guidance</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your AI Mentor
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent block">
                Trained on You
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Get personalized professional guidance from an AI that understands your unique background, 
              goals, and challenges. Transform your career with intelligent mentorship available 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-cyan-400 text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500 transition-all transform hover:scale-105 flex items-center space-x-2">
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-slate-600 text-slate-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800/50 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Intelligent Mentorship
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience the power of AI that truly understands your professional journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-slate-800 backdrop-blur-lg rounded-2xl p-6 border border-slate-600 hover:bg-slate-700 hover:border-cyan-400/50 transition-all duration-500 transform shadow-lg shadow-cyan-400/10 ${
                  isVisible[`feature-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                id={`feature-${index}`}
              >
                <div className="text-cyan-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300">
              Three simple steps to transform your career with AI mentorship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Story",
                description: "Tell us about your background, skills, experiences, and professional goals."
              },
              {
                step: "02",
                title: "AI Training",
                description: "Our AI analyzes your profile and creates a personalized mentorship model."
              },
              {
                step: "03",
                title: "Get Guidance",
                description: "Receive tailored advice, roadmaps, and insights whenever you need them."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-400 rounded-full text-2xl font-bold text-slate-900 mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">
            Success Stories
          </h2>

          <div className="bg-slate-800 backdrop-blur-lg rounded-2xl p-8 border border-slate-600 shadow-lg shadow-cyan-400/20">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-cyan-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl text-slate-200 mb-6 italic">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            
            <div>
              <div className="font-semibold text-white">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-cyan-400">
                {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-cyan-400' : 'bg-slate-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-300">
              Flexible pricing for every career stage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                features: [
                  "Basic AI mentorship",
                  "Monthly goal reviews",
                  "Email support",
                  "Career assessment"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$79",
                period: "/month",
                features: [
                  "Advanced AI training",
                  "Weekly 1:1 sessions",
                  "Priority support",
                  "Custom roadmaps",
                  "Industry insights",
                  "Progress tracking"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                features: [
                  "Full AI customization",
                  "Daily availability",
                  "Dedicated support",
                  "Team mentorship",
                  "Advanced analytics",
                  "White-label option"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-slate-800 backdrop-blur-lg rounded-2xl p-8 border shadow-lg ${
                  plan.popular 
                    ? 'border-cyan-400 transform scale-105 shadow-cyan-400/20' 
                    : 'border-slate-600 shadow-slate-900/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyan-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-300">
                      <Check className="w-5 h-5 text-cyan-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-cyan-400 text-slate-900 hover:bg-cyan-500'
                    : 'border border-slate-600 text-slate-300 hover:bg-slate-700'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of professionals who are already benefiting from personalized AI mentorship
          </p>
          <button className="bg-cyan-400 text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <span>Start Your Free Trial</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

     
    </div>
  );
}