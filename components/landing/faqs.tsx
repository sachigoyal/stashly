import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function FAQs() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="space-y-4 text-center mb-8">
        <div className="mx-auto bg-muted/50 w-12 h-12 rounded-full flex items-center justify-center">
          <HelpCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-heading">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-md mx-auto">Everything you need to know about Stashly and how it can help you manage your images</p>
      </div>
      
      <Card className="border bg-card/50 overflow-hidden shadow-sm rounded-lg p-0">
        <CardContent className="p-0">
          <Accordion type="multiple" className="">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-sm md:text-base rounded-none font-medium hover:bg-muted/30 hover:no-underline px-6 py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground px-6 py-3 whitespace-pre-wrap">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}

const faqs = [
  {
    question: "What is Stashly?",
    answer: "Stashly is your personal image storage solution that provides a secure and intuitive platform for managing your digital memories. Built with modern technology, it offers a seamless experience for storing, organizing, and accessing your images from anywhere. Whether you're a photographer, designer, or just someone who wants to keep their images organized, Stashly is designed to meet your needs."
  },
  {
    question: "What features does Stashly offer?",
    answer: "Stashly comes packed with essential features to make image management effortless:\n\n• Upload images individually or in bulk\n• View images in an optimized gallery\n• Star important images for quick access\n• Temporary deletion with trash system\n• Bulk downloads for convenience\n• Secure storage with encryption\n• Local search functionality\n• Intuitive dashboard interface\n• Custom error handling\n\nWe're constantly adding new features to enhance your experience!"
  },
  {
    question: "Is my data secure with Stashly?",
    answer: "Security is our top priority. Stashly implements multiple layers of protection:\n\n• Clerk authentication for secure user management\n• Industry-standard encryption for data storage\n• Protected API endpoints\n• Secure image processing through ImageKit\n• Regular security updates\n• Personal access controls\n\nYour images are accessible only to you, and we never share or sell your data to third parties."
  },
  {
    question: "Can I organize my images?",
    answer: "Absolutely! Stashly provides comprehensive organization tools:\n\n• Star system for marking important images\n• Trash management for temporary deletion and recovery\n• Advanced search functionality to find images quickly\n• Clean and organized dashboard layout\n• Intuitive navigation system\n• Profile-based organization\n\nThese features work together to create a seamless organization experience tailored to your needs."
  },
  {
    question: "What image formats are supported?",
    answer: "Stashly supports a wide range of image formats through our ImageKit integration:\n\n• JPEG/JPG - Perfect for photographs\n• PNG - Ideal for graphics with transparency\n• GIF - Supports both static and animated images\n• WebP - Modern format for optimized web images\n• SVG - Vector graphics\n• HEIC - High-efficiency image format\n\nAll images are automatically optimized for storage and delivery while maintaining quality."
  }
]