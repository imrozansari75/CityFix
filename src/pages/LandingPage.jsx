import { useState } from "react";
import { FaShieldAlt, FaMapMarkerAlt, FaUsers, FaCar, FaLightbulb, FaTrash, FaEdit, FaCheckCircle, FaCamera, FaUpload, FaSyncAlt, FaMobileAlt, FaCog, FaCheck, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ---------- Small components ---------- */

function Feature({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-gray-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

function SidebarItem({ label, active }) {
  return (
    <div
      className={`px-2 py-1 rounded-md cursor-pointer ${active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-500"
        }`}
    >
      {label}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="border border-gray-100 rounded-lg p-2 text-center">
      <p className={`font-bold text-sm ${color}`}>{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}

function ReportRow({ title, location, status, time }) {
  const statusColors = {
    Resolved: "bg-green-100 text-green-700",
    "In Progress": "bg-amber-100 text-amber-700",
    Assigned: "bg-purple-100 text-purple-700",
  };
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-200" />
        <div>
          <p className="text-xs font-medium text-gray-900">{title}</p>
          <p className="text-[10px] text-gray-400">{location}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
        <span className="text-[10px] text-gray-400">{time}</span>
      </div>
    </div>
  );
}

function ProblemCard({ icon, bg, title, text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 text-left flex items-start gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{text}</p>
      </div>
    </div>
  );
}

function Step({ num, numColor, icon, iconBg, title, text }) {
  return (
    <div className="flex flex-col items-center max-w-[180px]">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-5 h-5 rounded-full text-white text-xs flex items-center justify-center ${numColor}`}>
          {num}
        </span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}

function Field({ label, placeholder }) {
  return (
    <div className="mb-3">
      <label className="text-xs text-gray-500 block mb-1">{label}</label>
      <div className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-400">
        {placeholder}
      </div>
    </div>
  );
}

function FeatureItem({ title, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
        <FaCheck size={14} />
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-gray-500 text-sm">{text}</p>
      </div>
    </div>
  );
}

function StatBlock({ value, label }) {
  return (
    <div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}

function Testimonial({ quote, name, role }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 text-left">
      <p className="text-2xl text-gray-300 mb-2">“</p>
      <p className="text-gray-700 text-sm mb-4">{quote}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
        <p className="text-amber-400 text-sm">★★★★★</p>
      </div>
    </div>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="text-white font-medium mb-3">{title}</h4>
      <ul className="flex flex-col gap-2 text-gray-400 text-xs">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="relative border-b border-gray-100 bg-white">
        <div className="max-w-full mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm">
              CF
            </div>
            CityFix
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#how" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md transition-all duration-300 overflow-hidden 
          ${isOpen ? "max-h-96 py-4" : "max-h-0"}`
          }
        >
          <div className="flex flex-col px-6 gap-4">
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button className="w-full py-2 border border-gray-200 rounded-lg" onClick={() => navigate("/login")}>
              Sign In
            </button>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-8 py-16 mx-auto">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Report City Problems. <br />
            Improve Your <span className="text-blue-600">Community</span>.
          </h1>
          <p className="text-gray-600 mb-6 max-w-md">
            CityFix helps citizens report public infrastructure issues and
            track their resolution in real time. Together, let's build a
            better city.
          </p>
          <div className="flex gap-4 mb-10">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
              <FaEdit size={18} /> Report an Issue
            </button>
            <button className="px-5 py-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              Learn More
            </button>
          </div>
          <div className="flex gap-10 text-sm">
            <Feature icon={<FaShieldAlt size={20} className="text-blue-600" />} title="Fast Reporting" subtitle="Report in seconds" />
            <Feature icon={<FaSyncAlt size={20} className="text-green-600" />} title="Real-time Tracking" subtitle="Stay updated" />
            <Feature icon={<FaUsers size={20} className="text-purple-600" />} title="Community Driven" subtitle="Stronger together" />
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-4">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-32 border-r border-gray-100 pr-3 text-xs text-gray-500 flex flex-col gap-3">
              <div className="flex items-center gap-1 font-bold text-gray-900 mb-2">
                <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">CF</div>
                CityFix
              </div>
              <SidebarItem label="Dashboard" active />
              <SidebarItem label="My Reports" />
              <SidebarItem label="New Report" />
              <SidebarItem label="Notifications" />
              <SidebarItem label="Profile" />
              <SidebarItem label="Settings" />
              <div className="mt-auto pt-6 flex items-center gap-2 text-gray-700">
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <div>
                  <p className="font-medium text-gray-900 text-[11px]">Imroz Khan</p>
                  <p className="text-[10px]">imroz@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 pl-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Dashboard</h3>
                <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md">
                  + New Report
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <StatCard label="Total Reports" value="127" color="text-blue-600" />
                <StatCard label="Resolved" value="95" color="text-green-600" />
                <StatCard label="In Progress" value="18" color="text-amber-500" />
                <StatCard label="Submitted" value="14" color="text-purple-600" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">Recent Reports</h4>
                  <a href="#" className="text-xs text-blue-600">View All</a>
                </div>
                <ReportRow title="Pothole on MG Road" location="Indiranagar, Bangalore" status="Resolved" time="2h ago" />
                <ReportRow title="Broken Street Light" location="Koramangala, Bangalore" status="In Progress" time="1d ago" />
                <ReportRow title="Garbage Dump Near Park" location="HSR Layout, Bangalore" status="Assigned" time="2d ago" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-gray-50 px-8 py-16 text-center">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          The Problem
        </p>
        <h2 className="text-3xl font-bold mb-3">
          Many issues go unnoticed. <br /> Communities suffer.
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          From potholes to garbage dumps, small issues can create big
          problems when left unreported.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ProblemCard
            icon={<FaCar size={28} className="text-red-500" />}
            bg="bg-red-50"
            title="Damaged Roads"
            text="Potholes and road damage cause accidents and traffic jams."
          />
          <ProblemCard
            icon={<FaLightbulb size={28} className="text-amber-500" />}
            bg="bg-amber-50"
            title="Broken Streetlights"
            text="Faulty lights lead to dark areas and safety concerns at night."
          />
          <ProblemCard
            icon={<FaTrash size={28} className="text-green-500" />}
            bg="bg-green-50"
            title="Garbage & Waste"
            text="Uncollected waste creates pollution and unhealthy environments."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-indigo-50 px-8 py-16 text-center">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          How It Works
        </p>
        <h2 className="text-3xl font-bold mb-12">
          Simple steps for a better city
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 max-w-4xl mx-auto">
          <Step
            num="1"
            numColor="bg-blue-600"
            icon={<FaEdit size={28} className="text-blue-600" />}
            iconBg="bg-blue-100"
            title="Report"
            text="Submit an issue with details, photo and exact location."
          />
          <div className="hidden md:block flex-1 border-t border-dashed border-gray-300" />
          <Step
            num="2"
            numColor="bg-green-600"
            icon={<FaMapMarkerAlt size={28} className="text-green-600" />}
            iconBg="bg-green-100"
            title="Track"
            text="Track the status of your report in real time."
          />
          <div className="hidden md:block flex-1 border-t border-dashed border-gray-300" />
          <Step
            num="3"
            numColor="bg-purple-600"
            icon={<FaCheckCircle size={28} className="text-purple-600" />}
            iconBg="bg-purple-100"
            title="Resolve"
            text="Authorities take action and resolve the issue."
          />
        </div>
      </section>

      {/* Features + phone mockup */}
      <section id="features" className="px-8 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Phone mockup */}
        <div className="flex justify-center">
          <div className="w-72 bg-white border-8 border-gray-900 rounded-3xl shadow-2xl p-4">
            <div className="bg-black w-16 h-5 rounded-xl mx-auto flex items-center justify-center -mt-2 mb-2">     </div>
            <div className="text-xs text-gray-500 mb-3">New Report</div>
            <Field label="Title" placeholder="Eg. Pothole on 5th Main Road" />
            <Field label="Category" placeholder="Pothole" />
            <Field label="Location" placeholder="Indiranagar, Bangalore" />
            <div className="mb-3">
              <label className="text-xs text-gray-500 block mb-1">Description</label>
              <textarea
                disabled
                placeholder="Large pothole causing vehicle damage."
                className="w-full text-xs border border-gray-200 rounded-md p-2 resize-none h-16 text-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-500 block mb-1">Upload Image</label>
              <div className="flex gap-2">
                <div className="w-14 h-14 rounded-md bg-gray-200 flex items-center justify-center">
                  <FaCamera size={18} className="text-gray-500" />
                </div>
                <div className="w-14 h-14 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  +
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-md">
              Submit Report
            </button>
          </div>
        </div>

        {/* Feature list */}
        <div>
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
            Features
          </p>
          <h2 className="text-3xl font-bold mb-6">
            Everything you need to make an impact
          </h2>
          <div className="flex flex-col gap-4">
            <FeatureItem
              icon={<FaMapMarkerAlt size={18} />}
              title="GPS Location Capture"
              text="Pinpoint issue locations accurately."
            />
            <FeatureItem
              icon={<FaUpload size={18} />}
              title="Image Upload"
              text="Add photos to help authorities understand better."
            />
            <FeatureItem
              icon={<FaSyncAlt size={18} />}
              title="Real-time Status Tracking"
              text="Stay informed at every step."
            />
            <FeatureItem
              icon={<FaShieldAlt size={18} />}
              title="Secure & Reliable"
              text="Your data is safe with us."
            />
            <FeatureItem
              icon={<FaMobileAlt size={18} />}
              title="Mobile Friendly"
              text="Report issues from anywhere, anytime."
            />
            <FeatureItem
              icon={<FaCog size={18} />}
              title="Admin Management"
              text="Efficient resolution by authorities."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-50 px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          <StatBlock value="12,847" label="Reports Submitted" />
          <StatBlock value="8,392" label="Issues Resolved" />
          <StatBlock value="73%" label="Resolution Rate" />
          <StatBlock value="24hr" label="Avg Response Time" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-16 text-center">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">
          What People Say
        </p>
        <h2 className="text-3xl font-bold mb-10">
          Trusted by thousands of citizens
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Testimonial
            quote="Reporting road issues has never been easier. CityFix is a great initiative for our community."
            name="Sneha R."
            role="Local Resident"
          />
          <Testimonial
            quote="The tracking system keeps us informed and gives transparency in the process."
            name="Arun Kumar"
            role="Community Volunteer"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-16">
        <div className="max-w-5xl mx-auto bg-blue-600 text-white rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <FaUsers size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ready to improve your city?</h3>
              <p className="text-blue-100 text-sm">
                Join thousands of citizens who are already making their
                communities better.
              </p>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-medium whitespace-nowrap">
            Get Started Now →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-8 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 font-bold text-white mb-3">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-xs">CF</div>
              CityFix
            </div>
            <p className="text-gray-400 text-xs mb-4">
              Empowering citizens to report issues and improve communities
              together.
            </p>
            <div className="flex gap-3 text-gray-400">
              <FaTwitter size={16} />
              <FaFacebook size={16} />
              <FaInstagram size={16} />
              <FaLinkedin size={16} />
            </div>
          </div>
          <FooterCol title="Product" items={["Features", "How It Works", "Pricing"]} />
          <FooterCol title="Company" items={["About Us", "Blog", "Contact"]} />
          <FooterCol title="Resources" items={["Help Center", "Privacy Policy", "Terms of Service"]} />
          <div>
            <h4 className="text-white font-medium mb-3">Stay Updated</h4>
            <p className="text-gray-400 text-xs mb-3">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-xs px-3 py-2 rounded-l-md flex-1 outline-none"
              />
              <button className="bg-blue-600 text-white text-xs px-3 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-10 border-t border-gray-800 pt-6">
          © {new Date().getFullYear()} CityFix. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
