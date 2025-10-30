document.addEventListener('DOMContentLoaded', function() {
    // 响应式处理函数
    function handleResponsive() {
        const viewportWidth = window.innerWidth;
        const isMobile = viewportWidth < 768;
        const isTablet = viewportWidth >= 768 && viewportWidth < 992;
        const isDesktop = viewportWidth >= 992;
        const isLargeScreen = viewportWidth >= 1920;
        
        // 根据屏幕尺寸调整元素大小和布局
        adjustElementSizes(isMobile, isTablet, isDesktop, isLargeScreen);
        
        // 调整导航栏行为
        adjustNavbarBehavior(isMobile, isTablet, isDesktop);
        
        // 调整网格布局
        adjustGridLayouts(isMobile, isTablet, isDesktop, isLargeScreen);
        
        // 调整字体大小
        adjustFontSizes(isMobile, isTablet, isDesktop, isLargeScreen);
    }
    
    // 调整元素大小
    function adjustElementSizes(isMobile, isTablet, isDesktop, isLargeScreen) {
        // 调整按钮大小
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            if (isMobile) {
                btn.style.padding = '10px 20px';
                btn.style.fontSize = '14px';
            } else if (isTablet) {
                btn.style.padding = '12px 24px';
                btn.style.fontSize = '15px';
            } else if (isLargeScreen) {
                btn.style.padding = '14px 32px';
                btn.style.fontSize = '18px';
            } else {
                btn.style.padding = '12px 28px';
                btn.style.fontSize = '16px';
            }
        });
        
        // 调整图标大小
        const icons = document.querySelectorAll('.service-icon, .contact-icon, .social-link');
        icons.forEach(icon => {
            if (icon.classList.contains('service-icon')) {
                if (isMobile) {
                    icon.style.width = '60px';
                    icon.style.height = '60px';
                } else if (isLargeScreen) {
                    icon.style.width = '90px';
                    icon.style.height = '90px';
                } else {
                    icon.style.width = '80px';
                    icon.style.height = '80px';
                }
            } else if (icon.classList.contains('contact-icon')) {
                if (isMobile) {
                    icon.style.width = '50px';
                    icon.style.height = '50px';
                } else if (isLargeScreen) {
                    icon.style.width = '70px';
                    icon.style.height = '70px';
                } else {
                    icon.style.width = '60px';
                    icon.style.height = '60px';
                }
            } else if (icon.classList.contains('social-link')) {
                if (isMobile) {
                    icon.style.width = '40px';
                    icon.style.height = '40px';
                } else if (isLargeScreen) {
                    icon.style.width = '50px';
                    icon.style.height = '50px';
                } else {
                    icon.style.width = '45px';
                    icon.style.height = '45px';
                }
            }
        });
    }
    
    // 调整导航栏行为
    function adjustNavbarBehavior(isMobile, isTablet, isDesktop) {
        const navbar = document.getElementById('navbar');
        const mobileNav = document.querySelector('.mobile-nav');
        const desktopNav = document.querySelector('.desktop-nav');
        
        if (isMobile || isTablet) {
            desktopNav.style.display = 'none';
            mobileNav.style.display = 'flex';
            
            // 确保移动端导航关闭
            mobileNav.classList.remove('active');
        } else {
            desktopNav.style.display = 'flex';
            mobileNav.style.display = 'none';
            
            // 确保移动端导航关闭
            mobileNav.classList.remove('active');
        }
    }
    
    // 调整网格布局
    function adjustGridLayouts(isMobile, isTablet, isDesktop, isLargeScreen) {
        const servicesGrid = document.querySelector('.services-grid');
        const productsGrid = document.querySelector('.products-grid');
        const caseStudiesGrid = document.querySelector('.case-studies-grid');
        const aboutStats = document.querySelector('.about-stats');
        
        // 服务网格
        if (servicesGrid) {
            if (isMobile) {
                servicesGrid.style.gridTemplateColumns = '1fr';
                servicesGrid.style.gap = '25px';
            } else if (isTablet) {
                servicesGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                servicesGrid.style.gap = '30px';
            } else if (isLargeScreen) {
                servicesGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                servicesGrid.style.gap = '50px';
            } else {
                servicesGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                servicesGrid.style.gap = '40px';
            }
        }
        
        // 产品网格
        if (productsGrid) {
            if (isMobile) {
                productsGrid.style.gridTemplateColumns = '1fr';
                productsGrid.style.gap = '25px';
            } else if (isTablet) {
                productsGrid.style.gridTemplateColumns = '1fr';
                productsGrid.style.gap = '30px';
            } else if (isLargeScreen) {
                productsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                productsGrid.style.gap = '50px';
            } else {
                productsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                productsGrid.style.gap = '40px';
            }
        }
        
        // 案例网格
        if (caseStudiesGrid) {
            if (isMobile) {
                caseStudiesGrid.style.gridTemplateColumns = '1fr';
                caseStudiesGrid.style.gap = '25px';
            } else if (isTablet) {
                caseStudiesGrid.style.gridTemplateColumns = '1fr';
                caseStudiesGrid.style.gap = '30px';
            } else if (isLargeScreen) {
                caseStudiesGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                caseStudiesGrid.style.gap = '50px';
            } else {
                caseStudiesGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                caseStudiesGrid.style.gap = '40px';
            }
        }
        
        // 关于我们统计数据
        if (aboutStats) {
            if (isMobile) {
                aboutStats.style.gridTemplateColumns = 'repeat(2, 1fr)';
                aboutStats.style.gap = '20px';
            } else if (isTablet) {
                aboutStats.style.gridTemplateColumns = 'repeat(2, 1fr)';
                aboutStats.style.gap = '25px';
            } else if (isLargeScreen) {
                aboutStats.style.gridTemplateColumns = 'repeat(4, 1fr)';
                aboutStats.style.gap = '40px';
            } else {
                aboutStats.style.gridTemplateColumns = 'repeat(2, 1fr)';
                aboutStats.style.gap = '30px';
            }
        }
    }
    
    // 调整字体大小
    function adjustFontSizes(isMobile, isTablet, isDesktop, isLargeScreen) {
        const h1 = document.querySelector('h1');
        const h2 = document.querySelectorAll('h2');
        const h3 = document.querySelectorAll('h3');
        const p = document.querySelectorAll('p');
        
        // H1 字体大小
        if (h1) {
            if (isMobile) {
                h1.style.fontSize = '36px';
            } else if (isTablet) {
                h1.style.fontSize = '48px';
            } else if (isLargeScreen) {
                h1.style.fontSize = '72px';
            } else {
                h1.style.fontSize = '54px';
            }
        }
        
        // H2 字体大小
        h2.forEach(heading => {
            if (isMobile) {
                heading.style.fontSize = '28px';
            } else if (isTablet) {
                heading.style.fontSize = '36px';
            } else if (isLargeScreen) {
                heading.style.fontSize = '52px';
            } else {
                heading.style.fontSize = '42px';
            }
        });
        
        // H3 字体大小
        h3.forEach(heading => {
            if (isMobile) {
                heading.style.fontSize = '22px';
            } else if (isTablet) {
                heading.style.fontSize = '26px';
            } else if (isLargeScreen) {
                heading.style.fontSize = '32px';
            } else {
                heading.style.fontSize = '28px';
            }
        });
        
        // 段落字体大小
        p.forEach(paragraph => {
            if (isMobile) {
                paragraph.style.fontSize = '15px';
            } else if (isTablet) {
                paragraph.style.fontSize = '16px';
            } else if (isLargeScreen) {
                paragraph.style.fontSize = '18px';
            } else {
                paragraph.style.fontSize = '16px';
            }
        });
    }
    
    // 触摸设备优化
    function optimizeForTouch() {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            // 添加触摸友好的样式类
            document.body.classList.add('touch-device');
            
            // 增加触摸区域大小
            const interactiveElements = document.querySelectorAll('a, button, .nav-links li');
            interactiveElements.forEach(element => {
                element.style.touchAction = 'manipulation'; // 防止双击缩放
                element.style.cursor = 'pointer';
            });
            
            // 优化滚动行为
            document.addEventListener('touchmove', function(e) {
                if (e.touches.length > 1) {
                    e.preventDefault(); // 防止缩放
                }
            }, { passive: false });
            
            // 优化点击延迟
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('touchstart', function() {}, { passive: true });
            });
        }
    }
    
    // 高分辨率屏幕优化
    function optimizeForHighDPI() {
        const dpr = window.devicePixelRatio || 1;
        
        if (dpr > 1) {
            // 为高DPI屏幕添加优化类
            document.body.classList.add('high-dpi');
            
            // 可以在这里添加特定的高DPI优化，如图像替换等
        }
    }
    
    // 方向变化处理
    function handleOrientationChange() {
        // 当设备方向改变时重新处理响应式设计
        setTimeout(() => {
            handleResponsive();
            // 重新初始化懒加载
            const lazyLoadImages = window.lazyLoadImages;
            if (typeof lazyLoadImages === 'function') {
                lazyLoadImages();
            }
        }, 300); // 添加小延迟，确保方向变化完成
    }
    
    // 初始化
    handleResponsive();
    optimizeForTouch();
    optimizeForHighDPI();
    
    // 事件监听
    window.addEventListener('resize', handleResponsive);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('load', handleResponsive); // 确保页面完全加载后应用响应式设置
    
    // 处理窗口滚动对响应式元素的影响
    window.addEventListener('scroll', function() {
        // 在滚动时可以根据需要调整某些响应式元素
        const isMobile = window.innerWidth < 768;
        
        // 例如，在移动设备上滚动时调整导航栏样式
        if (isMobile) {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
            } else {
                navbar.style.padding = '20px 0';
            }
        }
    });
});