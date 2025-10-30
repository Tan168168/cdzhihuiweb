// 案例筛选功能实现
(function() {
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        // 获取筛选按钮和案例卡片
        const filterButtons = document.querySelectorAll('.filter-btn');
        const caseCards = document.querySelectorAll('.case-card');
        
        // 为筛选按钮添加点击事件
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 为当前点击的按钮添加active类
                button.classList.add('active');
                
                // 获取当前筛选类别
                const filter = button.getAttribute('data-filter');
                
                // 筛选案例卡片
                caseCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    // 如果筛选类别为'all'或者卡片类别匹配，显示卡片，否则隐藏
                    if (filter === 'all' || filter === category) {
                        // 为了添加动画效果，先移除display:none（如果存在）
                        card.style.display = 'block';
                        // 添加淡入动画
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        // 添加淡出动画
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        // 动画结束后隐藏卡片
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // 为案例卡片添加淡入动画
        caseCards.forEach((card, index) => {
            // 为卡片设置初始状态
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // 延迟显示卡片，创建级联效果
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    });
})();