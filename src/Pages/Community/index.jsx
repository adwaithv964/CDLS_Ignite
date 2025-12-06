import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
    Settings,
    Code,
    Terminal,
    Layout,
    PenTool,
    Megaphone,
    Bot,
    Monitor,
    PlayCircle
} from 'lucide-react';

const Community = () => {
    const categories = [
        {
            id: 1,
            title: "Accounting",
            icon: <Settings size={32} className="text-[#0EA5E9]" />,
            bgColor: "bg-[#E0F2FE]", // Light Sky Blue
            borderColor: "border-[#0EA5E9]" // Sky Blue
        },
        {
            id: 2,
            title: "Web Developement",
            icon: <Code size={32} className="text-[#F43F5E]" />,
            bgColor: "bg-[#FFE4E6]", // Light Rose
            borderColor: "border-[#F43F5E]" // Rose
        },
        {
            id: 3,
            title: "Remote Support Jobs",
            icon: <Terminal size={32} className="text-[#10B981]" />,
            bgColor: "bg-[#D1FAE5]", // Light Emerald
            borderColor: "border-[#10B981]" // Emerald
        },
        {
            id: 4,
            title: "UI/UX Design",
            icon: <Layout size={32} className="text-[#F59E0B]" />,
            bgColor: "bg-[#FEF3C7]", // Light Amber
            borderColor: "border-[#F59E0B]" // Amber
        },
        {
            id: 5,
            title: "Content Writing",
            icon: <PenTool size={32} className="text-[#8B5CF6]" />,
            bgColor: "bg-[#EDE9FE]", // Light Violet
            borderColor: "border-[#8B5CF6]" // Violet
        },
        {
            id: 6,
            title: "Digital Marketing",
            icon: <Megaphone size={32} className="text-[#EC4899]" />,
            bgColor: "bg-[#FCE7F3]", // Light Pink
            borderColor: "border-[#EC4899]" // Pink
        },
        {
            id: 7,
            title: "Robotics",
            icon: <Bot size={32} className="text-[#6366F1]" />,
            bgColor: "bg-[#E0E7FF]", // Light Indigo
            borderColor: "border-[#6366F1]" // Indigo
        },
        {
            id: 8,
            title: "Product Design",
            icon: <Monitor size={32} className="text-[#F97316]" />,
            bgColor: "bg-[#FFEDD5]", // Light Orange
            borderColor: "border-[#F97316]" // Orange
        },
        {
            id: 9,
            title: "Operations",
            icon: <PlayCircle size={32} className="text-[#06B6D4]" />,
            bgColor: "bg-[#CFFAFE]", // Light Cyan
            borderColor: "border-[#06B6D4]" // Cyan
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FFFBF0]"> {/* Cream background from main layout */}
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gray-50 py-24 relative overflow-hidden border-b border-gray-100">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1B2A41] mb-6">
                            Learning Communities At CDLS
                        </h1>
                        <p className="max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed">
                            CDLS learning communities bring together people with shared interests to explore, create, and grow
                            through collaborative digital learning. They provide a supportive space where learners, mentors, and
                            innovators exchange ideas, build skills, and work on real-world projects that strengthen both individual
                            capabilities and the community as a whole.
                        </p>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex justify-center mb-16">
                            <div className="text-center">
                                <span className="uppercase tracking-widest text-[#8B5CF6] bg-[#EDE9FE] px-4 py-1 rounded text-xs font-bold mb-4 inline-block">
                                    COMMUNITY
                                </span>
                                <h2 className="text-4xl font-bold text-[#1B2A41]">
                                    Browse By Categories
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`${category.bgColor} rounded-xl p-8 flex items-center space-x-6 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                                >
                                    <div className={`p-4 rounded-full bg-white/50 border-2 ${category.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1B2A41]">
                                        {category.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Community;
