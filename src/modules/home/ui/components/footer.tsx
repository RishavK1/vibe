import Link from "next/link"
import Image from "next/image"

export const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return (
        <footer className="border-t mt-20">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Bloom" width={20} height={20} />
                        <span className="text-sm text-muted-foreground">
                            © {currentYear} Bloom. All rights reserved.
                        </span>
                    </div>
                    
                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm">
                        <Link 
                            href="/pricing" 
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Pricing
                        </Link>
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

