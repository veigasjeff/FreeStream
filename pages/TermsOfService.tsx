
import React from 'react';

const TermsOfService: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 className="font-display font-bold text-4xl mb-8 border-l-4 border-primary pl-4">Terms of Service</h1>
    <div className="prose prose-invert lg:prose-xl text-gray-300 space-y-4 max-w-none">
      <p>Last Updated: {new Date().toLocaleDateString()}</p>
      <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the FreeStream™ website (the "Service") operated by us.</p>
      
      <h2 className="text-2xl font-bold text-white">Agreement to Terms</h2>
      <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

      <h2 className="text-2xl font-bold text-white">Content</h2>
      <p>Our Service provides links to third-party content. We do not host, store, or distribute any of the content displayed. We are not responsible for the content, accuracy, or legality of any third-party websites or resources. You acknowledge and agree that FreeStream™ is not responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>

      <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
      <p>The Service and its original content (excluding content provided by third parties), features, and functionality are and will remain the exclusive property of FreeStream™ and its licensors. The Service is protected by copyright, trademark, and other laws.</p>

      <h2 className="text-2xl font-bold text-white">Disclaimer</h2>
      <p>The use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>

      <h2 className="text-2xl font-bold text-white">Changes</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
    </div>
  </div>
);

export default TermsOfService;
