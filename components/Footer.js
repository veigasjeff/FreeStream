import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaRss } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark/95 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg transform rotate-45"></div>
                <div className="absolute inset-2 bg-dark rounded-sm flex items-center justify-center">
                  <span className="text-primary font-display font-black text-xl">FS</span>
                </div> */}
              </div>
              {/* <span className="text-2xl font-display font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> */}
             <span className="text-2xl font-display font-black gradient-text">   Free Streaming
              </span>
            </div>
            <p className="text-light/70 text-sm">
              Your premier destination for free, high-quality movie streaming. Watch the latest shows anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light/70 hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-light/70 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-light/70 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-light/70 hover:text-primary transition-colors">
                <FaYoutube size={20} />
              </a>
              <a href="/sitemap.xml" className="text-light/70 hover:text-primary transition-colors">
                <FaRss size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-light mb-4">  <span className="text-2xl font-display font-black gradient-text"> Quick Links  </span></h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-light/70 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/schedule" className="text-light/70 hover:text-primary transition-colors">Schedule</Link></li>
              <li><Link href="/contact" className="text-light/70 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/request" className="text-light/70 hover:text-primary transition-colors">Request Movie</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-light mb-4">  <span className="text-2xl font-display font-black gradient-text"> Legal </span></h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-light/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-light/70 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal" className="text-light/70 hover:text-primary transition-colors">Legal Disclaimer</Link></li>
              <li><a href="/faq" className="text-light/70 hover:text-primary transition-colors">FAQ Page</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h3 className="text-lg font-bold text-light mb-4">Stay Updated</h3>
            <p className="text-light/70 text-sm mb-4">
              Subscribe to get notified about new shows and special streaming events.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-light placeholder-light/50 focus:outline-none focus:border-primary"
              />
              <button type="submit" className="btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-light/50 text-sm">
            © {currentYear} FreeStream. All content is publicly available and streamed under fair use. 
            This is a demonstration website for educational purposes.
          </p>
          <p className="text-light/30 text-xs mt-2">
            Made with ❤️ for movie lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}