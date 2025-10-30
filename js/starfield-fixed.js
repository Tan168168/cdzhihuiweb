// 调试版本 - " + new Date().getTime() + "
document.addEventListener('DOMContentLoaded', function() {
    console.log('Starfield-fixed script loaded at:', new Date());
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas大小
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // 配置
    const config = {
        STAR_COUNT: 300,
        NEBULA_COUNT: 5,
        GALAXY_COUNT: 3,
        PARTICLE_BEAM_COUNT: 2,
        GRID_NODE_COUNT: 20,
        SPACE_OBJECT_COUNT: 8,
        TECH_ORB_COUNT: 5,
        WORMHOLE_COUNT: 1
    };
    
    // 颜色定义
    const colors = {
        background: ['#000022', '#000033', '#000044'],
        stars: [
            { color: 'rgba(255, 255, 255, 1)', size: 1, speed: 0.1 },
            { color: 'rgba(255, 255, 0, 1)', size: 1.5, speed: 0.05 },
            { color: 'rgba(255, 165, 0, 1)', size: 1.2, speed: 0.08 },
            { color: 'rgba(135, 206, 250, 1)', size: 1.3, speed: 0.07 }
        ],
        beam: 'rgba(14, 165, 233, 1)',
        grid: 'rgba(14, 165, 233, 0.1)',
        spaceObject: [
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(59, 130, 246, 1)'
        ],
        techOrb: 'rgba(14, 165, 233, 1)',
        wormhole: 'rgba(139, 92, 246, 1)'
    };
    
    // 粒子系统
    let stars = [];
    let nebulas = [];
    let galaxies = [];
    let particleBeams = [];
    let gridNodes = [];
    let spaceObjects = [];
    let techOrbs = [];
    let wormholes = [];
    
    // 鼠标交互
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let lastMouseMoveTime = 0;
    
    // 初始化星星
    function initStars() {
        stars = [];
        
        for (let i = 0; i < config.STAR_COUNT; i++) {
            const starType = Math.floor(Math.random() * colors.stars.length);
            const color = colors.stars[starType];
            
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: color.size * (Math.random() * 0.5 + 0.8),
                color: color.color,
                speed: color.speed * (Math.random() * 0.5 + 0.8),
                trajectoryAngle: Math.random() * Math.PI * 2,
                flickerRate: Math.random() * 0.05 + 0.01,
                flickerAmount: Math.random() * 0.3 + 0.1,
                flickerPhase: Math.random() * Math.PI * 2,
                pulse: Math.random() > 0.8,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    // 初始化星云
    function initNebulas() {
        nebulas = [];
        
        for (let i = 0; i < config.NEBULA_COUNT; i++) {
            nebulas.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 300 + 200,
                color: colors.stars[Math.floor(Math.random() * colors.stars.length)].color,
                opacity: Math.random() * 0.3 + 0.1,
                speed: Math.random() * 0.1 + 0.05,
                direction: Math.random() * Math.PI * 2,
                rotation: Math.random() * 0.001 - 0.0005,
                rotationAngle: 0
            });
        }
    }
    
    // 初始化星系
    function initGalaxies() {
        galaxies = [];
        
        for (let i = 0; i < config.GALAXY_COUNT; i++) {
            galaxies.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 200 + 150,
                arms: Math.floor(Math.random() * 2) + 2, // 2-3个旋臂
                color: colors.stars[Math.floor(Math.random() * 3) + 1].color, // 使用彩色星星颜色
                opacity: Math.random() * 0.3 + 0.1,
                rotationSpeed: Math.random() * 0.0005 - 0.00025,
                angle: 0,
                density: Math.random() * 0.2 + 0.1
            });
        }
    }
    
    // 初始化粒子光束
    function initParticleBeams() {
        particleBeams = [];
        
        for (let i = 0; i < config.PARTICLE_BEAM_COUNT; i++) {
            const length = Math.random() * 300 + 100;
            const width = Math.random() * 3 + 1;
            
            particleBeams.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: length,
                width: width,
                angle: Math.random() * Math.PI * 2,
                color: colors.beam,
                opacity: Math.random() * 0.5 + 0.1,
                pulseSpeed: Math.random() * 0.03 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                particles: []
            });
            
            // 为光束生成粒子
            for (let j = 0; j < Math.floor(length / 5); j++) {
                particleBeams[i].particles.push({
                    offset: Math.random() * length,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 3 + 1
                });
            }
        }
    }
    
    // 初始化网格节点
    function initGridNodes() {
        gridNodes = [];
        
        for (let i = 0; i < config.GRID_NODE_COUNT; i++) {
            gridNodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                pulseSpeed: Math.random() * 0.05 + 0.02,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    // 初始化太空物体
    function initSpaceObjects() {
        spaceObjects = [];
        
        for (let i = 0; i < config.SPACE_OBJECT_COUNT; i++) {
            spaceObjects.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 50 + 20,
                color: colors.spaceObject[Math.floor(Math.random() * colors.spaceObject.length)],
                opacity: Math.random() * 0.5 + 0.3,
                rotationSpeed: Math.random() * 0.002 - 0.001,
                rotationAngle: 0,
                shape: Math.floor(Math.random() * 3) // 0: 圆形, 1: 三角形, 2: 四边形
            });
        }
    }
    
    // 初始化科技球体
    function initTechOrbs() {
        techOrbs = [];
        
        for (let i = 0; i < config.TECH_ORB_COUNT; i++) {
            techOrbs.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 30 + 10,
                color: colors.techOrb,
                opacity: Math.random() * 0.5 + 0.3,
                pulseSpeed: Math.random() * 0.03 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                glowRadius: Math.random() * 50 + 30
            });
        }
    }
    
    // 初始化虫洞
    function initWormholes() {
        wormholes = [];
        
        for (let i = 0; i < config.WORMHOLE_COUNT; i++) {
            wormholes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 100 + 80,
                color: colors.wormhole,
                opacity: Math.random() * 0.5 + 0.3,
                rotationSpeed: Math.random() * 0.005 - 0.0025,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: 0
            });
        }
    }
    
    // 初始化所有太空元素
    function initSpaceElements() {
        setCanvasSize();
        initStars();
        initNebulas();
        initGalaxies();
        initParticleBeams();
        initGridNodes();
        initSpaceObjects();
        initTechOrbs();
        initWormholes();
    }
    
    // 绘制渐变背景
    function drawBackground() {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, colors.background[0]);
        gradient.addColorStop(0.5, colors.background[1]);
        gradient.addColorStop(1, colors.background[2]);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // drawNebulas函数已暂时删除，以解决双重alpha值错误
    
    // 绘制星系
    function drawGalaxies() {
        galaxies.forEach(galaxy => {
            galaxy.angle += galaxy.rotationSpeed;
            
            // 提取原始颜色的RGB部分，忽略alpha值
            const baseColor = galaxy.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (baseColor) {
                const r = parseInt(baseColor[1]);
                const g = parseInt(baseColor[2]);
                const b = parseInt(baseColor[3]);
                
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                
                for (let i = 0; i < galaxy.arms; i++) {
                    const armAngle = galaxy.angle + (i * Math.PI * 2 / galaxy.arms);
                    
                    // 绘制旋臂
                    for (let j = 0; j < 50; j++) {
                        const distance = (j / 50) * galaxy.size;
                        const offset = Math.sin(j * 0.5) * galaxy.size * 0.15;
                        const angle = armAngle + offset / galaxy.size * 2;
                        
                        const x = galaxy.x + Math.cos(angle) * distance;
                        const y = galaxy.y + Math.sin(angle) * distance;
                        const size = (1 - j / 50) * 2 * galaxy.density;
                        const opacity = (1 - j / 50) * galaxy.opacity * 0.8;
                        
                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                        ctx.fill();
                    }
                }
                
                // 绘制星系中心
                ctx.beginPath();
                ctx.arc(galaxy.x, galaxy.y, galaxy.size * 0.1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${galaxy.opacity * 0.5})`;
                ctx.fill();
                
                ctx.restore();
            }
        });
    }
    
    // 绘制星星
    function drawStars() {
        stars.forEach(star => {
            // 更新星星位置
            star.x += Math.cos(star.trajectoryAngle) * star.speed;
            star.y += Math.sin(star.trajectoryAngle) * star.speed;
            
            // 更新闪烁效果
            star.flickerPhase += star.flickerRate;
            const flicker = Math.sin(star.flickerPhase) * star.flickerAmount + (1 - star.flickerAmount);
            
            // 更新脉冲效果
            let pulseFactor = 1;
            if (star.pulse) {
                star.pulsePhase += star.pulseSpeed;
                pulseFactor = Math.sin(star.pulsePhase) * 0.3 + 1;
            }
            
            const currentOpacity = star.opacity * flicker * pulseFactor;
            
            // 边界检查
            if (star.x < -50 || star.x > canvas.width + 50 || 
                star.y < -50 || star.y > canvas.height + 50) {
                // 从边缘重新进入
                const edge = Math.floor(Math.random() * 4);
                
                switch (edge) {
                    case 0: // 上边缘
                        star.x = Math.random() * canvas.width;
                        star.y = -50;
                        break;
                    case 1: // 右边缘
                        star.x = canvas.width + 50;
                        star.y = Math.random() * canvas.height;
                        break;
                    case 2: // 下边缘
                        star.x = Math.random() * canvas.width;
                        star.y = canvas.height + 50;
                        break;
                    case 3: // 左边缘
                        star.x = -50;
                        star.y = Math.random() * canvas.height;
                        break;
                }
            }
            
            // 绘制星星
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = currentOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }
    
    // 绘制粒子光束
    function drawParticleBeams() {
        particleBeams.forEach(beam => {
            // 更新脉冲效果
            beam.pulsePhase += beam.pulseSpeed;
            const pulse = Math.sin(beam.pulsePhase) * 0.4 + 0.8;
            const currentOpacity = beam.opacity * pulse;
            
            // 提取原始颜色的RGB部分，忽略alpha值
            const baseColor = beam.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (baseColor) {
                const r = baseColor[1];
                const g = baseColor[2];
                const b = baseColor[3];
                
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.translate(beam.x, beam.y);
                ctx.rotate(beam.angle);
                
                // 绘制光束主体
                const beamGradient = ctx.createLinearGradient(0, -beam.width/2, beam.length, -beam.width/2);
                beamGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
                beamGradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
                beamGradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
                beamGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                ctx.beginPath();
                ctx.moveTo(0, -beam.width/2);
                ctx.lineTo(beam.length, -beam.width/2);
                ctx.lineTo(beam.length, beam.width/2);
                ctx.lineTo(0, beam.width/2);
                ctx.closePath();
                ctx.fillStyle = beamGradient;
                ctx.fill();
                
                // 绘制光束粒子
                beam.particles.forEach(particle => {
                    particle.offset += particle.speed;
                    if (particle.offset > beam.length) {
                        particle.offset = 0;
                    }
                    
                    ctx.beginPath();
                    ctx.arc(particle.offset, 0, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity * currentOpacity})`;
                    ctx.fill();
                });
                
                ctx.restore();
            }
        });
    }
    
    // 绘制网格节点
    function drawGridNodes() {
        // 更新并绘制节点
        gridNodes.forEach(node => {
            node.pulsePhase += node.pulseSpeed;
            const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
            const currentOpacity = node.opacity * pulse;
            
            // 绘制节点
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(14, 165, 233, ${currentOpacity})`;
            ctx.fill();
            
            // 绘制光晕
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(14, 165, 233, ${currentOpacity * 0.1})`;
            ctx.fill();
        });
        
        // 绘制连接线条
        ctx.save();
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < gridNodes.length; i++) {
            for (let j = i + 1; j < gridNodes.length; j++) {
                const dx = gridNodes[i].x - gridNodes[j].x;
                const dy = gridNodes[i].y - gridNodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // 只连接距离较近的节点
                if (distance < 200) {
                    const opacity = 1 - (distance / 200);
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.moveTo(gridNodes[i].x, gridNodes[i].y);
                    ctx.lineTo(gridNodes[j].x, gridNodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        ctx.globalAlpha = 1;
        ctx.restore();
    }
    
    // 绘制太空物体
    function drawSpaceObjects() {
        spaceObjects.forEach(obj => {
            // 更新旋转角度
            obj.rotationAngle += obj.rotationSpeed;
            
            // 提取原始颜色的RGB部分，忽略alpha值
            const baseColor = obj.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (baseColor) {
                const r = baseColor[1];
                const g = baseColor[2];
                const b = baseColor[3];
                
                ctx.save();
                ctx.translate(obj.x, obj.y);
                ctx.rotate(obj.rotationAngle);
                ctx.globalCompositeOperation = 'lighter';
                
                // 根据形状绘制不同的太空物体
                switch (obj.shape) {
                    case 0: // 圆形
                        ctx.beginPath();
                        ctx.arc(0, 0, obj.size / 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.3})`;
                        ctx.fill();
                        
                        // 添加外环
                        ctx.beginPath();
                        ctx.arc(0, 0, obj.size / 1.5, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        break;
                    
                    case 1: // 三角形
                        ctx.beginPath();
                        ctx.moveTo(0, -obj.size / 2);
                        ctx.lineTo(obj.size / 2, obj.size / 4);
                        ctx.lineTo(-obj.size / 2, obj.size / 4);
                        ctx.closePath();
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.3})`;
                        ctx.fill();
                        
                        // 添加边框
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.8})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        break;
                    
                    case 2: // 四边形
                        ctx.beginPath();
                        ctx.rect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.3})`;
                        ctx.fill();
                        
                        // 添加边框
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.8})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        break;
                }
                
                ctx.restore();
            }
        });
    }
    
    // 绘制科技球体
    function drawTechOrbs() {
        techOrbs.forEach(orb => {
            // 更新脉冲效果
            orb.pulsePhase += orb.pulseSpeed;
            const pulse = Math.sin(orb.pulsePhase) * 0.3 + 0.7;
            const currentOpacity = orb.opacity * pulse;
            
            // 提取原始颜色的RGB部分，忽略alpha值
            const baseColor = orb.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (baseColor) {
                const r = baseColor[1];
                const g = baseColor[2];
                const b = baseColor[3];
                
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                
                // 绘制光晕
                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.glowRadius);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.5})`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.2})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.glowRadius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // 绘制球体
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
                ctx.fill();
                
                // 绘制核心
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.size * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
                ctx.fill();
                
                // 绘制科技线条
                ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.6})`;
                ctx.lineWidth = 0.5;
                
                // 横向线条
                for (let i = 0; i < 5; i++) {
                    const y = (i - 2) * (orb.size * 0.4);
                    const length = Math.sqrt(orb.size * orb.size - y * y) * 2;
                    
                    ctx.beginPath();
                    ctx.moveTo(orb.x - length / 2, orb.y + y);
                    ctx.lineTo(orb.x + length / 2, orb.y + y);
                    ctx.stroke();
                }
                
                // 纵向线条
                for (let i = 0; i < 5; i++) {
                    const x = (i - 2) * (orb.size * 0.4);
                    const length = Math.sqrt(orb.size * orb.size - x * x) * 2;
                    
                    ctx.beginPath();
                    ctx.moveTo(orb.x + x, orb.y - length / 2);
                    ctx.lineTo(orb.x + x, orb.y + length / 2);
                    ctx.stroke();
                }
                
                ctx.restore();
            }
        });
    }
    
    // 绘制虫洞
    function drawWormholes() {
        wormholes.forEach(wormhole => {
            // 更新脉冲和旋转
            wormhole.pulsePhase += wormhole.pulseSpeed;
            
            // 提取原始颜色的RGB部分，忽略alpha值
            const baseColor = wormhole.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (baseColor) {
                const r = baseColor[1];
                const g = baseColor[2];
                const b = baseColor[3];
                
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                
                // 绘制虫洞外围光晕
                const pulse = Math.sin(wormhole.pulsePhase) * 0.3 + 0.7;
                const currentOpacity = wormhole.opacity * pulse;
                
                const outerGradient = ctx.createRadialGradient(
                    wormhole.x, wormhole.y, 0,
                    wormhole.x, wormhole.y, wormhole.size * 2
                );
                outerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.1})`);
                outerGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.05})`);
                outerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                ctx.beginPath();
                ctx.arc(wormhole.x, wormhole.y, wormhole.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = outerGradient;
                ctx.fill();
                
                // 绘制虫洞环
                const ringGradient = ctx.createRadialGradient(
                    wormhole.x, wormhole.y, wormhole.size * 0.8,
                    wormhole.x, wormhole.y, wormhole.size * 1.2
                );
                ringGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
                ringGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.8})`);
                ringGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                ctx.beginPath();
                ctx.arc(wormhole.x, wormhole.y, wormhole.size, 0, Math.PI * 2);
                ctx.fillStyle = ringGradient;
                ctx.fill();
                
                // 绘制虫洞内部
                const innerGradient = ctx.createRadialGradient(
                    wormhole.x, wormhole.y, 0,
                    wormhole.x, wormhole.y, wormhole.size * 0.8
                );
                innerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.2})`);
                innerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                ctx.beginPath();
                ctx.arc(wormhole.x, wormhole.y, wormhole.size * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = innerGradient;
                ctx.fill();
                
                ctx.restore();
            }
        });
    }
    
    // 处理鼠标交互
    function handleMouseInteraction() {
        // 如果鼠标500ms内没有移动，则视为静止
        if (Date.now() - lastMouseMoveTime > 500) {
            isMouseMoving = false;
        }
        
        if (isMouseMoving) {
            // 影响星星
            stars.forEach(star => {
                const dx = star.x - mouseX;
                const dy = star.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    // 鼠标靠近时星星快速闪烁
                    star.flickerRate = 0.2;
                    star.flickerAmount = 0.8;
                } else {
                    // 恢复正常闪烁
                    star.flickerRate = 0.05;
                    star.flickerAmount = 0.1;
                }
            });
            
            // 影响太空物体
            spaceObjects.forEach(obj => {
                const dx = obj.x - mouseX;
                const dy = obj.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 300) {
                    // 太空物体靠近鼠标时增强旋转速度
                    obj.rotationSpeed = Math.min(0.01, obj.rotationSpeed + 0.0005);
                    obj.opacity = Math.min(1, obj.opacity + 0.01);
                } else {
                    // 恢复正常旋转速度
                    obj.rotationSpeed = Math.max(0.001, obj.rotationSpeed - 0.0005);
                    obj.opacity = Math.max(0.3, obj.opacity - 0.005);
                }
            });
            
            // 影响虫洞
            wormholes.forEach(wormhole => {
                const dx = wormhole.x - mouseX;
                const dy = wormhole.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 300) {
                    // 虫洞靠近鼠标时增强脉冲和旋转
                    wormhole.pulseSpeed = Math.min(0.05, wormhole.pulseSpeed + 0.001);
                    wormhole.rotationSpeed = Math.min(0.02, wormhole.rotationSpeed + 0.001);
                    wormhole.opacity = Math.min(0.8, wormhole.opacity + 0.01);
                } else {
                    // 恢复正常脉冲和旋转
                    wormhole.pulseSpeed = Math.max(0.01, wormhole.pulseSpeed - 0.0005);
                    wormhole.rotationSpeed = Math.max(0.0005, wormhole.rotationSpeed - 0.0005);
                    wormhole.opacity = Math.max(0.3, wormhole.opacity - 0.005);
                }
            });
        }
    }
    
    // 鼠标移动事件
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        lastMouseMoveTime = Date.now();
    });
    
    // 视差滚动效果
    let scrollY = window.scrollY;
    let scale = 1;
    
    window.addEventListener('scroll', function() {
        scrollY = window.scrollY;
        scale = 1 + scrollY * 0.0003;
    });
    
    // 主动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 应用视差变换
        ctx.save();
        ctx.scale(scale, scale);
        const offsetX = (canvas.width / 2) * (1 - 1/scale);
        const offsetY = (canvas.height / 2) * (1 - 1/scale);
        ctx.translate(offsetX, offsetY);
        
        // 按深度顺序绘制
        drawBackground();
        // drawNebulas(); // 暂时注释掉，以排查错误
        drawGalaxies();
        drawStars();
        drawParticleBeams();
        drawGridNodes();
        drawSpaceObjects();
        drawTechOrbs();
        drawWormholes();
        
        ctx.restore();
        
        // 处理交互
        handleMouseInteraction();
        
        requestAnimationFrame(animate);
    }
    
    // 初始化并开始动画
    initSpaceElements();
    animate();
    
    // 窗口大小变化时重新调整
    window.addEventListener('resize', function() {
        setCanvasSize();
    });
});