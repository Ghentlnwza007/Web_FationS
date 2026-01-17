
import re
import os

index_css_path = r'c:\Users\Kanta\.gemini\antigravity\scratch\Wed-Projects22-Fixed\src\index.css'
src_dir = r'c:\Users\Kanta\.gemini\antigravity\scratch\Wed-Projects22-Fixed\src'

# Map Section Names (Upper Case from CSS) to Filenames
file_map = {
    'MAISON - PREMIUM LIFESTYLE WEAR': 'styles/base.css',
    'PERFORMANCE OPTIMIZATIONS': 'styles/utils.css',
    'ACCESSIBILITY UTILITIES': 'styles/accessibility.css',
    'NAVIGATION': 'components/Navbar.css',
    'CURRENCY SELECTOR': 'components/CurrencySelector.css',
    'HERO SECTION': 'components/Hero.css',
    'COLLECTIONS': 'components/Collections.css',
    'NEW ARRIVALS': 'components/NewArrivals.css',
    'PRODUCT CARDS': 'components/ProductCard.css',
    'PRODUCT GALLERY': 'components/ProductGallery.css',
    'ABOUT SECTION': 'components/About.css',
    'CREATORS SECTION': 'components/Creators.css',
    'FOOTER': 'components/Footer.css',
    'MODALS': 'styles/modals.css',
    'CART SIDEBAR': 'components/CartSidebar.css',
    'WISHLIST SIDEBAR': 'components/WishlistSidebar.css',
    'AUTH MODAL': 'components/AuthModal.css',
    'TOAST NOTIFICATION': 'components/Toast.css',
    'AI CHATBOT': 'components/AIChatbot.css',
    'PRODUCT MODAL': 'components/ProductModal.css',
    'PRODUCT CARD': 'components/ProductCard.css', # Overwrite or append? Probably fine if separate blocks.
    'RESPONSIVE': 'styles/responsive.css',
    'ANIMATIONS': 'styles/animations.css',
    'REGISTRATION FORM MODAL': 'components/RegistrationModal.css',
    'RESPONSIVE - REGISTRATION & GALLERY': 'styles/responsive-gallery.css',
    'GLOBAL SEARCH MODAL': 'components/SearchModal.css',
    'SIZE SELECTION MODAL': 'components/SizeSelectionModal.css',
    'CHECKOUT MODAL': 'components/CheckoutModal.css',
    'COLOR SELECTOR': 'components/ColorSelector.css',
    'GALLERY COLOR SELECTOR': 'components/GalleryColorSelector.css',
    'MORE BUTTON & CREATOR PROFILE SECTION': 'components/CreatorProfile.css',
    'FINAL SALE PAGE STYLES': 'components/FinalSale.css',
    'PRODUCT ACTIONS (REVIEW BUTTON)': 'components/ProductActions.css',
    'STAR RATING COMPONENT': 'components/StarRating.css',
    'REVIEW MODAL': 'components/ReviewModal.css',
    'PRODUCT REVIEWS DISPLAY': 'components/ProductReviews.css',
    'REVIEW FORM': 'components/ReviewForm.css',
    'ADMIN PANEL STYLES': 'components/AdminPanel.css',
    'SHARE BUTTONS': 'components/ShareButtons.css',
    'FLASH SALE TIMER': 'components/FlashSaleTimer.css',
    'RECENTLY VIEWED': 'components/RecentlyViewed.css',
    'PRODUCT COMPARE': 'components/ProductCompare.css',
    'STOCK NOTIFICATION': 'components/StockNotification.css',
    'LOYALTY POINTS': 'components/LoyaltyPoints.css',
    'LIVE CHAT WIDGET': 'components/LiveChat.css',
    '3D PRODUCT VIEWER': 'components/Product3DViewer.css',
    'VIRTUAL TRY-ON': 'components/VirtualTryOn.css',
    'CHECKOUT MODAL STYLES': 'components/CheckoutModalStyles.css',
    'ERROR BOUNDARY STYLES': 'styles/ErrorBoundary.css',
    'COLOR PICKER STYLES': 'components/ColorPicker.css',
}

def split_css():
    with open(index_css_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find headers
    # /* ============...
    #    HEADER TEXT
    #    ============... */
    
    # We use multiline mode. 
    # The header names observed:
    # "MAISON - Premium Lifestyle Wear" (First one might be multiline or specific)
    # Let's try to capture the text between the separator lines.
    
    # Pattern: /\* =+\s*\n\s*(.*?)\s*\n\s*=+\s*\*/
    pattern = r'/\* =+\s*\n\s*(.*?)\s*\n\s*=+\s*\*/'
    
    matches = list(re.finditer(pattern, content, re.DOTALL))
    
    print(f"Found {len(matches)} sections.")
    
    # Sort just in case, though finditer is sequential
    matches.sort(key=lambda x: x.start())
    
    for i in range(len(matches)):
        m = matches[i]
        header_text = m.group(1).strip().upper() # Normalize to key
        # Handle the multiline first header special case "MAISON...\n Modern..."
        if "MAISON" in header_text:
            header_text = "MAISON - PREMIUM LIFESTYLE WEAR"
            
        start_idx = m.start()
        
        if i < len(matches) - 1:
            end_idx = matches[i+1].start()
        else:
            end_idx = len(content)
            
        chunk = content[start_idx:end_idx].strip()
        
        # Determine filename
        # Partial match keys?
        target_file = None
        for key in file_map:
            if key in header_text:
                target_file = file_map[key]
                break
        
        if not target_file:
            print(f"Unknown section: '{header_text}'. Skipping write (or append to a misc file).")
            # Maybe default to styles/misc.css?
            target_file = 'styles/misc.css'
            
        full_path = os.path.join(src_dir, target_file)
        
        # Ensure dir
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        
        with open(full_path, 'w', encoding='utf-8') as out:
            out.write(chunk)
            
        print(f"Wrote {len(chunk)} bytes to {target_file}")

    print("Splitting Done.")

if __name__ == "__main__":
    split_css()
