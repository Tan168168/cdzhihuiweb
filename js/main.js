document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    
    function handleScroll() {
        // 导航栏滚动效果
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 返回顶部按钮显示/隐藏
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // 滚动时的元素动画
        animateOnScroll();
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑导航栏高度
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                mobileNav.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });
    });
    
    // 返回顶部功能
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 移动端导航菜单
    const mobileNavTrigger = document.querySelector('.mobile-nav-trigger');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    
    mobileNavTrigger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        menuIcon.classList.toggle('active');
        
        // 更改菜单图标为叉号
        if (menuIcon.classList.contains('active')) {
            menuIcon.style.background = 'transparent';
            menuIcon.style.transform = 'rotate(45deg)';
            menuIcon.querySelector('::before') && (menuIcon.querySelector('::before').style.transform = 'rotate(90deg) translate(0, 0)');
            menuIcon.querySelector('::after') && (menuIcon.querySelector('::after').style.transform = 'rotate(-90deg) translate(0, 0)');
        } else {
            menuIcon.style.background = '';
            menuIcon.style.transform = '';
        }
    });
    
    // 点击页面其他区域关闭移动端菜单
    document.addEventListener('click', function(e) {
        if (!mobileNavTrigger.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });
    
    // 滚动时的元素动画
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .product-card, .case-study-card, .stat-item, .about-text, .about-stats');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 模拟表单提交
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // 显示加载状态
            submitButton.disabled = true;
            submitButton.innerHTML = '提交中...';
            
            // 模拟API请求延迟
            setTimeout(() => {
                // 在实际应用中，这里应该有真实的表单提交逻辑
                // 使用CMS的数据API来提交表单
                
                // 重置表单
                contactForm.reset();
                
                // 恢复按钮状态并显示成功消息
                submitButton.innerHTML = '提交成功!';
                
                // 3秒后恢复按钮原始状态
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 3000);
            }, 1500);
        });
    }
    
    // 图片懒加载
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            const imgPosition = img.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (imgPosition < screenPosition) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                
                // 添加淡入效果
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in-out';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
            }
        });
    }
    
    // 服务卡片悬停效果增强
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 25px -5px rgba(14, 165, 233, 0.1), 0 10px 10px -5px rgba(14, 165, 233, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // 初始化
    handleScroll(); // 初始检查滚动位置
    lazyLoadImages(); // 初始加载可见区域的图片
    
    // 事件监听
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', lazyLoadImages);
    
    // 平滑滚动到锚点（刷新页面时）
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// 产品横向滚动函数
function scrollProductsLeft() {
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.scrollBy({
            left: -420, // 卡片宽度380px + 间隙30px + 额外10px
            behavior: 'smooth'
        });
    }
}

function scrollProductsRight() {
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.scrollBy({
            left: 420, // 卡片宽度380px + 间隙30px + 额外10px
            behavior: 'smooth'
        });
    }
}