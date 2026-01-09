
import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 className="font-display font-bold text-4xl mb-8 border-l-4 border-primary pl-4">Privacy Policy</h1>
    <div className="prose prose-invert lg:prose-xl text-gray-300 space-y-4 max-w-none">
      <p>Effective Date: {new Date().toLocaleDateString()}</p>
      <p>Welcome to FreeStream™. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
      
      <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
      <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
      <ul className="list-disc list-inside">
        <li><strong>Personal Data:</strong> We do not require you to register or provide any personal information to use our service. We do not collect personally identifiable information, such as your name, shipping address, email address, or telephone number.</li>
        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. This data is used for analytical purposes and to ensure the security of our platform.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white">Use of Your Information</h2>
      <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
      <ul className="list-disc list-inside">
        <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
        <li>Ensure the security and operation of our services.</li>
        <li>Comply with legal and regulatory requirements.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white">Third-Party Websites</h2>
      <p>The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.</p>

      <h2 className="text-2xl font-bold text-white">Contact Us</h2>
      <p>If you have questions or comments about this Privacy Policy, please contact us using the information provided on our Contact Us page.</p>
    </div>
  </div>
);

export default PrivacyPolicy;
