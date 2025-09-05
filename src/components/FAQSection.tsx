import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What type of music does VDJ Shana create?",
      answer: "VDJ Shana specializes in mashup songs across multiple languages including Bengali, Hindi, English, and Bhojpuri. Each track is carefully crafted to blend traditional melodies with modern production techniques."
    },
    {
      question: "How often are new songs released?",
      answer: "We release new mashup tracks weekly! Our goal is to keep the content fresh and exciting for our listeners. Subscribe to our channel to get notified about the latest releases."
    },
    {
      question: "Can I request a specific song for mashup?",
      answer: "Absolutely! We love hearing from our fans. You can submit song requests through our contact page, and we'll consider them for future mashup projects."
    },
    {
      question: "Are the songs available for download?",
      answer: "Currently, our songs are available for streaming on YouTube. We're working on making them available on other platforms soon. Stay tuned for updates!"
    },
    {
      question: "Do you collaborate with other artists?",
      answer: "Yes! We're always open to collaborating with talented artists and musicians. If you're interested in working with us, please reach out through our contact page."
    },
    {
      question: "What makes VDJ Shana's mashups unique?",
      answer: "Our mashups stand out because of their seamless blend of different musical cultures, high-quality production, and creative arrangements that respect the original songs while adding a fresh contemporary twist."
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="text-neon animate-glow">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers! Find everything you need to know about VDJ Shana.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-all duration-300 animate-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-primary/30">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Feel free to reach out to us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 glow">
                Contact Us
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-300">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;