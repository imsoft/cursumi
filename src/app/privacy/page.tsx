import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Notice | Cursumi",
  description: "Learn how Cursumi collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex-1">
        <div className="w-full px-4 py-12 md:px-6 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="group">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to home
                </Link>
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Notice</h1>
                <p className="mt-4 text-muted-foreground">Last updated: May 1, 2023</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">1. Introduction</h2>
                <p>
                  At Cursumi, we value and respect your privacy. This Privacy Notice explains how we collect, use, share, and protect the personal information we obtain through our ebook platform, and your rights regarding that information. By using Cursumi, you accept the practices described in this notice.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Registration information:</strong> When you create an account, we collect your name, email address, password, and optionally, your profile photo.</li>
                  <li><strong>Payment information:</strong> If you make purchases, we collect the payment details necessary to process the transaction. Note that we do not store your full credit card information, as we use secure third-party payment processors.</li>
                  <li><strong>Usage information:</strong> We collect data about how you interact with our platform, including the ebooks you view, purchase, and read, as well as the time you spend in different sections.</li>
                  <li><strong>Device information:</strong> We may collect information about the device you use to access Cursumi, including the model, operating system, unique identifiers, and mobile network data.</li>
                  <li><strong>Communications:</strong> If you contact our support team, we may keep those communications to better assist you and improve our services.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our platform and services.</li>
                  <li>Process your transactions and send you related confirmations.</li>
                  <li>Personalize your experience and offer you ebook recommendations based on your interests and activity.</li>
                  <li>Communicate with you about updates, special offers, events, and other promotional messages (you can opt out of these messages at any time).</li>
                  <li>Respond to your comments, questions, and support requests.</li>
                  <li>Detect, investigate, and prevent fraudulent activities and unauthorized access to our services.</li>
                  <li>Comply with legal and regulatory obligations.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. Information Sharing</h2>
                <p>We may share your personal information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service providers:</strong> We work with companies that provide us with services such as payment processing, data analysis, email delivery, web hosting, and customer service.</li>
                  <li><strong>Legal compliance:</strong> We may disclose information if we believe in good faith that it is necessary to comply with the law, protect the rights of Cursumi or others, investigate fraud, or respond to a government request.</li>
                  <li><strong>Business transfers:</strong> If Cursumi is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
                  <li><strong>With your consent:</strong> We may share your information with third parties when you give us your consent to do so.</li>
                </ul>
                <p>We do not sell your personal information to third parties for marketing or advertising purposes without your explicit consent.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Information Security</h2>
                <p>
                  We implement technical, administrative, and physical security measures designed to protect your personal information against unauthorized access, loss, misuse, or alteration. However, no security system is impenetrable, and we cannot guarantee the absolute security of your information.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">6. Your Rights and Choices</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal information we have about you.</li>
                  <li>Correct inaccurate or incomplete information.</li>
                  <li>Delete your personal information in certain circumstances.</li>
                  <li>Object to or restrict certain processing of your data.</li>
                  <li>Request data portability.</li>
                  <li>Withdraw your consent at any time (where processing is based on consent).</li>
                </ul>
                <p>
                  To exercise these rights, contact us at{" "}
                  <Link
                    href="mailto:cursumi.com@gmail.com"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline underline-offset-2"
                  >
                    cursumi.com@gmail.com
                  </Link>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">7. Changes to This Notice</h2>
                <p>
                  We may update this Privacy Notice periodically for operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Notice on our platform and, when appropriate, directly notifying you.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">8. Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Notice or our data practices, please contact our Data Protection Officer at{" "}
                  <Link
                    href="mailto:cursumi.com@gmail.com"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline underline-offset-2"
                  >
                    cursumi.com@gmail.com
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
