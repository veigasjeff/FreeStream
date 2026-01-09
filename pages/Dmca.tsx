
import React from 'react';

const Dmca: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 className="font-display font-bold text-4xl mb-8 border-l-4 border-primary pl-4">DMCA Policy</h1>
    <div className="prose prose-invert lg:prose-xl text-gray-300 space-y-4 max-w-none">
      <p>FreeStream™ respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged copyright infringement that are duly reported to our Designated Copyright Agent.</p>
      
      <h2 className="text-2xl font-bold text-white">Disclaimer</h2>
      <p>All content found on this website is not hosted on our servers or created by us. FreeStream™ functions as a search engine, finding and linking to content available on various third-party streaming sites. We are not responsible for the copyright compliance of these external sites. Any legal issues regarding copyright should be directed to the actual file hosts and providers.</p>

      <h2 className="text-2xl font-bold text-white">Notification of Copyright Infringement</h2>
      <p>If you are a copyright owner and believe that any content available on our site infringes upon your copyrights, you may submit a notification pursuant to the DMCA by providing our Copyright Agent with the following information in writing:</p>
      <ul className="list-disc list-inside">
        <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
        <li>Identification of the copyrighted work claimed to have been infringed.</li>
        <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled.</li>
        <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an email address.</li>
      </ul>
      <p>Please send your DMCA notice to the email address provided on our Contact Us page.</p>
    </div>
  </div>
);

export default Dmca;
