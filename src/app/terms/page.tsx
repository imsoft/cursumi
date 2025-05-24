import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms and Conditions | Cursumi",
  description: "Learn about the terms and conditions governing the use of the Cursumi platform.",
}

export default function TermsPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms and Conditions</h1>
                <p className="mt-4 text-muted-foreground">Last updated: May 1, 2023</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">1. Introduction</h2>
                <p>
                  Welcome to Cursumi. These Terms and Conditions govern your access to and use of the Cursumi platform, including any content, functionality, and services offered on or through cursumi.com (the &quot;Platform&quot;).
                </p>
                <p>
                  By accessing or using our Platform, you agree to be legally bound by these Terms and Conditions. If you do not agree with any of these terms, you must not access or use the Platform.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Definitions</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>&quot;Cursumi&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;</strong> refers to Cursumi S.L., the company that owns and operates the Platform.
                  </li>
                  <li>
                    <strong>&quot;User&quot;, &quot;you&quot; or &quot;your&quot;</strong> refers to any person who accesses or uses the Platform.
                  </li>
                  <li>
                    <strong>&quot;Content&quot;</strong> refers to the ebooks, texts, graphics, images, videos, software, designs, and other materials that appear or are available on the Platform.
                  </li>
                  <li>
                    <strong>&quot;Services&quot;</strong> refers to all services provided by Cursumi through the Platform, including the sale and distribution of ebooks.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. Account Registration</h2>
                <p>
                  To access certain features of the Platform, you must create an account. By registering, you agree to provide accurate, current, and complete information, and to keep it updated. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account.
                </p>
                <p>
                  We reserve the right to suspend or terminate your account if we determine, in our sole discretion, that you have violated these Terms and Conditions or if your use of the Platform poses a risk to Cursumi or other users.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. Purchase and Use of Ebooks</h2>
                <p>
                  By purchasing an ebook through our Platform, you acquire a non-exclusive, non-transferable, and limited license to access and use the ebook for your personal and non-commercial use.
                </p>
                <p>You are not authorized to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Redistribute, share, rent, lend, sell, sublicense, or transfer the ebook to third parties.</li>
                  <li>Copy, reproduce, modify, adapt, translate, or create derivative works based on the ebook, except as permitted by applicable law.</li>
                  <li>Remove, alter, or hide any copyright, trademark, or other proprietary notices included in the ebook.</li>
                  <li>Circumvent, disable, or interfere with the security features of the ebook or the Platform.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Prices and Payments</h2>
                <p>
                  All prices are shown in US dollars (USD) and include applicable taxes. We reserve the right to change ebook prices at any time, but changes will not affect purchases already made.
                </p>
                <p>
                  Payments are processed through secure payment service providers. By providing payment information, you warrant that you are authorized to use the specified payment method and that all payment information is true and accurate.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">6. Refund Policy</h2>
                <p>
                  Due to the digital nature of our products, we generally do not offer refunds once the purchase is complete and access to the ebook has been provided. However, we will consider refund requests in cases of:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Significant technical issues that prevent access to or reading of the ebook.</li>
                  <li>Accidental or unauthorized purchases (subject to verification).</li>
                  <li>Content that substantially differs from the provided description.</li>
                </ul>
                <p>
                  Refund requests must be submitted within 7 days of purchase to{" "}
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
                <h2 className="text-2xl font-bold">7. Intellectual Property</h2>
                <p>
                  The Platform and all its content, features, and functionalities are property of Cursumi, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p>
                  The ebooks available on our Platform are protected by copyright and are property of their respective authors or rights holders. Purchasing an ebook does not transfer any intellectual property rights over the ebook.
                </p>
                <p>
                  THE PLATFORM AND EBOOKS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, Cursumi shall not be liable for indirect, incidental, special, consequential, or punitive damages, or for any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your access or use, or inability to access or use the Platform.</li>
                  <li>Any conduct or content of third parties on the Platform.</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">9. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Modifications will become effective immediately upon posting the updated Terms and Conditions on the Platform. Your continued use of the Platform after the posting of the updated Terms and Conditions constitutes your acceptance of the changes.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">10. Applicable Law</h2>
                <p>
                  These Terms and Conditions shall be governed and interpreted in accordance with the laws of Spain, without giving effect to any provisions regarding conflicts of law. Any dispute related to these terms shall be subject to the exclusive jurisdiction of the courts of Madrid, Spain.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">11. Contact</h2>
                <p>
                  If you have questions about these Terms and Conditions, please contact us at{" "}
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
                <h2 className="text-2xl font-bold">12. Indemnity</h2>
                <p>
                  You agree to indemnify and hold harmless Cursumi, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&rsquo; fees) arising out of or in connection with your use of the Platform or Ebooks or your violation of these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
