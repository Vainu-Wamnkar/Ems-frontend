import React from "react";

function AboutCompany() {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          About Our Company
        </h1>
        <p className="text-gray-700 leading-relaxed mb-6">
          Founded in <span className="font-semibold">2015</span>,{" "}
          <span className="font-bold text-blue-700">TechNova Solutions Pvt. Ltd.</span> 
          is a leading software development and IT services company based in India. 
          Our mission is to empower businesses with innovative digital solutions that 
          drive growth, efficiency, and success in the modern world.
        </p>

        {/* Company Services */}
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">Our Services</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
          <li>Custom Web and Mobile App Development</li>
          <li>Cloud Integration and Deployment</li>
          <li>AI & Machine Learning Solutions</li>
          <li>UI/UX Design and Product Prototyping</li>
          <li>Enterprise Software and ERP Systems</li>
        </ul>

        {/* Achievements */}
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">Key Achievements</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
          <li>Recognized as one of India’s Top 50 Tech Startups in 2018</li>
          <li>Served over 200+ global clients across 15 countries</li>
          <li>Certified partner with Microsoft Azure and AWS Cloud</li>
          <li>Developed 300+ successful digital solutions worldwide</li>
          <li>Winner of “Best IT Innovation Award” in 2022</li>
        </ul>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To deliver top-quality digital solutions that transform ideas into impactful 
              realities and help organizations thrive in the digital era.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To become a globally trusted IT partner, known for innovation, 
              excellence, and long-lasting client relationships.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Contact Us</h2>
          <p className="text-gray-700">
            📍 <strong>Head Office:</strong> Pune, Maharashtra, India <br />
            📞 <strong>Phone:</strong> +91 98765 43210 <br />
            📧 <strong>Email:</strong> contact@technova.in
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutCompany;
