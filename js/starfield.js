// 调试版本 - " + new Date().getTime() + "
document.addEventListener('DOMContentLoaded', function() {
    console.log('Starfield script loaded at:', new Date());
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas大小
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        setCanvasSize();
        initSpaceElements(); // 重新初始化所有太空元素
    });
    
    // 配置常量
    const config = {
        STAR_COUNT: 3000,          // 星星数量
        NEBULA_COUNT: 8,           // 星云数量
        GALAXY_COUNT: 5,           // 星系数量
        PARTICLE_BEAM_COUNT: 15,   // 粒子光束数量
        GRID_NODE_COUNT: 50,       // 网格节点数量
        TECH_ORB_COUNT: 12,        // 科技球体数量
        SPACE_OBJECT_COUNT: 6,     // 太空物体数量（行星、空间站等）
        WORMHOLE_COUNT: 2,         // 虫洞数量
        FADE_SPEED: 0.02,          // 淡入淡出速度
        BASE_SPEED: 0.15,          // 基础移动速度
        INTERACTION_RADIUS: 300    // 交互半径
    };
    
    // 颜色方案 - 太空科技感
    const colors = {
        background: ['rgba(0, 0, 0, 1)', 'rgba(10, 0, 26, 1)', 'rgba(13, 0, 38, 1)', 'rgba(15, 0, 51, 1)'], // 深空渐变背景色
        stars: [
            { density: 0.4, size: 1, speed: 0.05, color: 'rgba(255, 255, 255, 0.9)' }, // 普通星星
            { density: 0.2, size: 1.5, speed: 0.1, color: 'rgba(14, 165, 233, 0.8)' }, // 蓝色星星
            { density: 0.15, size: 2, speed: 0.15, color: 'rgba(139, 92, 246, 0.8)' }, // 紫色星星
            { density: 0.1, size: 1.2, speed: 0.08, color: 'rgba(236, 72, 153, 0.8)' }, // 粉色星星
            { density: 0.08, size: 2.5, speed: 0.2, color: 'rgba(0, 255, 255, 0.9)' }, // 青色星星
            { density: 0.07, size: 3, speed: 0.25, color: 'rgba(255, 215, 0, 0.9)' }  // 金色星星
        ],
        nebula: [
            'rgba(139, 92, 246, 0.15)', 
            'rgba(14, 165, 233, 0.15)', 
            'rgba(236, 72, 153, 0.15)',
            'rgba(0, 255, 255, 0.1)',
            'rgba(255, 0, 255, 0.1)'
        ],
        beam: 'rgba(0, 255, 255, 0.7)',
        grid: 'rgba(0, 188, 212, 0.15)',
        techOrb: 'rgba(0, 255, 255, 0.8)',
        node: 'rgba(0, 188, 212, 0.6)',
        wormhole: 'rgba(138, 43, 226, 0.8)',
        planet: 'rgba(30, 144, 255, 0.9)',
        spaceStation: 'rgba(192, 192, 192, 0.8)'
    };
    
    // 太空元素数组
    let stars = [];
    let nebulas = [];
    let galaxies = [];
    let particleBeams = [];
    let gridNodes = [];
    let techOrbs = [];
    let spaceObjects = []; // 太空物体（行星、空间站等）
    let wormholes = [];    // 虫洞
    
    // 鼠标交互
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let isMouseMoving = false;
    let lastMouseMoveTime = 0;
    let mouseTrail = [];
    let mouseInfluence = 0; // 鼠标影响力
    
    // 初始化所有太空元素
    function initSpaceElements() {
        initStars();
        initNebulas();
        initGalaxies();
        initParticleBeams();
        initGridNodes();
        initTechOrbs();
        initSpaceObjects();
        initWormholes();
    }
    
    // 初始化星星
    function initStars() {
        stars = [];
        
        for (let i = 0; i < config.STAR_COUNT; i++) {
            // 根据密度选择星星类型
            let type;
            const rand = Math.random();
            let cumulativeDensity = 0;
            
            for (const starType of colors.stars) {
                cumulativeDensity += starType.density;
                if (rand < cumulativeDensity) {
                    type = starType;
                    break;
                }
            }
            
            // 确定星星层级（影响视差效果）
            const layer = Math.floor(Math.random() * 3) + 1; // 1-3层
            
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: type.size,
                speed: type.speed * (4 - layer) * config.BASE_SPEED,
                color: type.color,
                opacity: Math.random() * 0.7 + 0.3,
                flickerRate: Math.random() * 0.05 + 0.01,
                flickerAmount: Math.random() * 0.6 + 0.4,
                flickerPhase: Math.random() * Math.PI * 2,
                glow: Math.random() > 0.95, // 5%的星星有强光晕
                weakGlow: Math.random() > 0.7, // 30%的星星有弱光晕
                trajectoryAngle: Math.random() * Math.PI * 2,
                layer: layer,
                pulse: Math.random() > 0.8, // 20%的星星有脉冲效果
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.03 + 0.01
            });
        }
    }
    
    // 初始化星云
    function initNebulas() {
        nebulas = [];
        
        for (let i = 0; i < config.NEBULA_COUNT; i++) {
            const color = colors.nebula[Math.floor(Math.random() * colors.nebula.length)];
            const size = Math.random() * 300 + 200;
            
            // 使用简单字符串操作提取RGB部分，移除原始颜色中的alpha值
            const cleanColorStr = color.replace('rgba(', '').replace(')', '');
            const colorParts = cleanColorStr.split(',');
            
            let r, g, b;
            if (colorParts.length >= 3) {
                r = parseInt(colorParts[0].trim());
                g = parseInt(colorParts[1].trim());
                b = parseInt(colorParts[2].trim());
                
                // 构建不包含alpha的RGB颜色
                const rgbColor = `rgb(${r}, ${g}, ${b})`;
                
                nebulas.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    color: rgbColor, // 使用不包含alpha的RGB颜色
                    opacity: Math.random() * 0.4 + 0.1,
                    speed: Math.random() * 0.02 + 0.01 * config.BASE_SPEED,
                    angle: Math.random() * Math.PI * 2,
                    rotation: Math.random() * 0.001 - 0.0005,
                    rotationAngle: 0
                });
            }
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
                opacity: Math.random() * 0.7 + 0.3,
                pulse: Math.random() * 0.05 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                connections: []
            });
        }
        
        // 建立节点连接
        for (let i = 0; i < gridNodes.length; i++) {
            for (let j = i + 1; j < gridNodes.length; j++) {
                const dx = gridNodes[i].x - gridNodes[j].x;
                const dy = gridNodes[i].y - gridNodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200 && Math.random() > 0.7) { // 30%概率建立连接
                    gridNodes[i].connections.push(j);
                    gridNodes[j].connections.push(i);
                }
            }
        }
    }
    
    // 初始化科技球体
    function initTechOrbs() {
        techOrbs = [];
        
        for (let i = 0; i < config.TECH_ORB_COUNT; i++) {
            techOrbs.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 30 + 20,
                coreRadius: Math.random() * 5 + 3,
                opacity: Math.random() * 0.5 + 0.3,
                rotationSpeed: Math.random() * 0.005 - 0.0025,
                rotationAngle: 0,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                rings: Math.floor(Math.random() * 3) + 2, // 2-4个环
                ringData: []
            });
            
            // 生成环数据
            for (let j = 0; j < techOrbs[i].rings; j++) {
                techOrbs[i].ringData.push({
                    radius: techOrbs[i].radius * (0.5 + j * 0.2),
                    width: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.2,
                    rotationOffset: Math.random() * Math.PI * 2,
                    rotationSpeed: Math.random() * 0.01 - 0.005
                });
            }
        }
    }
    
    // 初始化太空物体（行星、空间站等）
    function initSpaceObjects() {
        spaceObjects = [];
        
        for (let i = 0; i < config.SPACE_OBJECT_COUNT; i++) {
            const type = Math.random() > 0.5 ? 'planet' : 'spaceStation';
            
            if (type === 'planet') {
                // 行星
                spaceObjects.push({
                    type: 'planet',
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 40 + 30,
                    color: colors.planet,
                    opacity: Math.random() * 0.4 + 0.3,
                    rotationSpeed: Math.random() * 0.002 - 0.001,
                    rotationAngle: 0,
                    hasRing: Math.random() > 0.7, // 30%概率有环
                    ringColor: 'rgba(200, 200, 200, 0.3)',
                    surfaceFeatures: []
                });
                
                // 添加行星表面特征
                for (let j = 0; j < 5; j++) {
                    spaceObjects[i].surfaceFeatures.push({
                        angle: Math.random() * Math.PI * 2,
                        distance: Math.random() * 0.8,
                        size: Math.random() * 0.2 + 0.1,
                        color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 0.5)`
                    });
                }
            } else {
                // 空间站
                spaceObjects.push({
                    type: 'spaceStation',
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 30 + 25,
                    color: colors.spaceStation,
                    opacity: Math.random() * 0.5 + 0.3,
                    rotationSpeed: Math.random() * 0.003 - 0.0015,
                    rotationAngle: 0,
                    modules: Math.floor(Math.random() * 4) + 3, // 3-6个模块
                    moduleData: [],
                    lights: []
                });
                
                // 生成模块数据
                for (let j = 0; j < spaceObjects[i].modules; j++) {
                    const angle = (j / spaceObjects[i].modules) * Math.PI * 2;
                    spaceObjects[i].moduleData.push({
                        angle: angle,
                        distance: spaceObjects[i].size * 0.8,
                        size: spaceObjects[i].size * 0.3
                    });
                }
                
                // 生成灯光
                for (let j = 0; j < 8; j++) {
                    spaceObjects[i].lights.push({
                        angle: Math.random() * Math.PI * 2,
                        distance: Math.random() * spaceObjects[i].size * 0.9,
                        size: Math.random() * 2 + 1,
                        blinkSpeed: Math.random() * 0.05 + 0.01,
                        blinkPhase: Math.random() * Math.PI * 2
                    });
                }
            }
        }
    }
    
    // 初始化虫洞
    function initWormholes() {
        wormholes = [];
        
        for (let i = 0; i < config.WORMHOLE_COUNT; i++) {
            wormholes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 50 + 40,
                innerRadius: Math.random() * 15 + 10,
                color: colors.wormhole,
                opacity: Math.random() * 0.5 + 0.3,
                rotationSpeed: Math.random() * 0.01 - 0.005,
                rotationAngle: 0,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                particles: []
            });
            
            // 生成虫洞粒子
            for (let j = 0; j < 50; j++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * wormholes[i].radius;
                
                wormholes[i].particles.push({
                    angle: angle,
                    distance: distance,
                    speed: Math.random() * 0.02 + 0.01,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2
                });
            }
        }
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
                        const opacity = parseFloat((1 - j / 50) * galaxy.opacity * 0.8);
                        
                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                        ctx.fill();
                        
                        // 镜像旋臂
                        const mirrorAngle = armAngle + Math.PI - offset / galaxy.size * 2;
                        const mirrorX = galaxy.x + Math.cos(mirrorAngle) * distance;
                        const mirrorY = galaxy.y + Math.sin(mirrorAngle) * distance;
                        
                        ctx.beginPath();
                        ctx.arc(mirrorX, mirrorY, size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                        ctx.fill();
                    }
                }
                
                // 绘制星系核心
                ctx.beginPath();
                ctx.arc(galaxy.x, galaxy.y, galaxy.size * 0.1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${parseFloat(galaxy.opacity)})`;
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
                
                // 随机调整轨迹角度
                star.trajectoryAngle = Math.random() * Math.PI * 2;
            }
            
            // 提取原始颜色的RGB部分，忽略alpha值
            const baseColor = star.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (baseColor) {
                const r = parseInt(baseColor[1]);
                const g = parseInt(baseColor[2]);
                const b = parseInt(baseColor[3]);
                
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                
                // 绘制强光晕（如果有）
                if (star.glow) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
                    const glowGradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 5
                    );
                    glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${parseFloat(currentOpacity * 0.3)})`);
                    glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                    ctx.fillStyle = glowGradient;
                    ctx.fill();
                }
                
                // 绘制弱光晕（如果有）
                if (star.weakGlow) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    const weakGlowGradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 2
                    );
                    weakGlowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${parseFloat(currentOpacity * 0.4)})`);
                    weakGlowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                    ctx.fillStyle = weakGlowGradient;
                    ctx.fill();
                }
                
                // 绘制星星核心
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * pulseFactor, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${parseFloat(currentOpacity)})`;
                ctx.fill();
                
                // 添加星芒效果（对部分星星）
                if (star.glow || (star.weakGlow && Math.random() > 0.5)) {
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.5})`;
                    ctx.lineWidth = star.size * 0.5;
                    
                    for (let i = 0; i < 8; i++) {
                        const angle = (i * Math.PI) / 4;
                        const startX = star.x + Math.cos(angle) * star.size;
                        const startY = star.y + Math.sin(angle) * star.size;
                        const endX = star.x + Math.cos(angle) * star.size * 3;
                        const endY = star.y + Math.sin(angle) * star.size * 3;
                        
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(endX, endY);
                        ctx.stroke();
                    }
                }
                
                ctx.restore();
            }
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
                
                // 绘制粒子
                beam.particles.forEach(particle => {
                    particle.offset += particle.speed;
                    if (particle.offset > beam.length) {
                        particle.offset = 0;
                    }
                    
                    const x = particle.offset;
                    const y = (Math.random() - 0.5) * beam.width * 0.8;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity * currentOpacity})`;
                    ctx.fill();
                    
                    // 添加粒子尾迹
                    ctx.beginPath();
                    ctx.moveTo(x - particle.speed * 2, y);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity * currentOpacity * 0.5})`;
                    ctx.lineWidth = particle.size * 0.8;
                    ctx.stroke();
                });
                
                ctx.restore();
            }
        });
    }
    
    // 绘制网格和节点
    function drawGridNodes() {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        
        // 绘制连接
        for (let i = 0; i < gridNodes.length; i++) {
            const node = gridNodes[i];
            
            node.connections.forEach(connectionIndex => {
                const connectedNode = gridNodes[connectionIndex];
                const dx = node.x - connectedNode.x;
                const dy = node.y - connectedNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // 距离越远，连接越淡
                const opacity = Math.max(0, node.opacity * 0.3 * (1 - distance / 200));
                
                // 提取网格颜色的RGB值
                const gridColor = colors.grid.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                if (gridColor) {
                    const r = gridColor[1];
                    const g = gridColor[2];
                    const b = gridColor[3];
                    
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(connectedNode.x, connectedNode.y);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        }
        
        // 绘制节点
        gridNodes.forEach(node => {
            node.pulsePhase += node.pulse;
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.8;
            
            // 提取节点颜色的RGB值
            const nodeColor = colors.node.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (nodeColor) {
                const r = nodeColor[1];
                const g = nodeColor[2];
                const b = nodeColor[3];
                
                // 节点外圈
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.opacity * 0.3 * pulse})`;
                ctx.fill();
                
                // 节点核心
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.opacity * pulse})`;
                ctx.fill();
            }
        });
        
        ctx.restore();
    }
    
    // 绘制科技球体
    function drawTechOrbs() {
        techOrbs.forEach(orb => {
            orb.rotationAngle += orb.rotationSpeed;
            orb.pulsePhase += orb.pulseSpeed;
            const pulse = Math.sin(orb.pulsePhase) * 0.2 + 1;
            const currentOpacity = orb.opacity * pulse;
            
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.translate(orb.x, orb.y);
            ctx.rotate(orb.rotationAngle);
            
            // 绘制外环
            orb.ringData.forEach(ring => {
                ctx.save();
                ctx.rotate(ring.rotationOffset + orb.rotationAngle * ring.rotationSpeed * 10);
                
                // 提取科技球体颜色的RGB值
                const orbColor = colors.techOrb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                if (orbColor) {
                    const r = orbColor[1];
                    const g = orbColor[2];
                    const b = orbColor[3];
                    
                    // 环形渐变
                    const ringGradient = ctx.createRadialGradient(
                        0, 0, ring.radius - ring.width,
                        0, 0, ring.radius + ring.width
                    );
                    ringGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
                    ringGradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${ring.opacity * currentOpacity})`);
                    ringGradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${ring.opacity * currentOpacity})`);
                    ringGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                    
                    // 绘制环形（使用两个圆的差值）
                    ctx.beginPath();
                    ctx.arc(0, 0, ring.radius + ring.width, 0, Math.PI * 2);
                    ctx.arc(0, 0, ring.radius - ring.width, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fillStyle = ringGradient;
                    ctx.fill();
                    
                    // 添加装饰性线条
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ring.opacity * currentOpacity * 0.5})`;
                    ctx.lineWidth = 1;
                    
                    for (let i = 0; i < 12; i++) {
                        const angle = (i * Math.PI * 2) / 12;
                        const startX = Math.cos(angle) * (ring.radius - ring.width);
                        const startY = Math.sin(angle) * (ring.radius - ring.width);
                        const endX = Math.cos(angle) * (ring.radius + ring.width);
                        const endY = Math.sin(angle) * (ring.radius + ring.width);
                        
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(endX, endY);
                        ctx.stroke();
                    }
                }
                
                ctx.restore();
            });
            
            // 提取科技球体颜色的RGB值（如果之前没有提取）
            const orbColor = colors.techOrb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (orbColor) {
                const r = orbColor[1];
                const g = orbColor[2];
                const b = orbColor[3];
                
                // 绘制核心
                ctx.beginPath();
                ctx.arc(0, 0, orb.coreRadius * pulse, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
                ctx.fill();
                
                // 添加核心辉光
                ctx.beginPath();
                ctx.arc(0, 0, orb.coreRadius * 3 * pulse, 0, Math.PI * 2);
                const glowGradient = ctx.createRadialGradient(
                    0, 0, 0,
                    0, 0, orb.coreRadius * 3 * pulse
                );
                glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.5})`);
                glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                ctx.fillStyle = glowGradient;
                ctx.fill();
            }
            
            ctx.restore();
        });
    }
    
    // 绘制太空物体（行星、空间站等）
    function drawSpaceObjects() {
        spaceObjects.forEach(obj => {
            // 更新旋转角度
            obj.rotationAngle += obj.rotationSpeed;
            
            // 鼠标交互
            const dx = mouse.x - obj.x;
            const dy = mouse.y - obj.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 300) {
                const force = (1 - distance / 300) * mouseInfluence;
                obj.x -= dx * force * 0.01;
                obj.y -= dy * force * 0.01;
            }
            
            // 边界检查
            if (obj.x < -150) obj.x = canvas.width + 150;
            if (obj.x > canvas.width + 150) obj.x = -150;
            if (obj.y < -150) obj.y = canvas.height + 150;
            if (obj.y > canvas.height + 150) obj.y = -150;
            
            ctx.save();
            ctx.translate(obj.x, obj.y);
            ctx.rotate(obj.rotationAngle);
            
            if (obj.type === 'planet') {
                // 提取行星颜色的RGB值
                const planetColor = obj.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                if (planetColor) {
                    const r = planetColor[1];
                    const g = planetColor[2];
                    const b = planetColor[3];
                    
                    // 绘制行星
                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, obj.radius);
                    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.8})`);
                    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.2})`);
                    
                    ctx.beginPath();
                    ctx.arc(0, 0, obj.radius, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
                
                // 绘制行星表面特征
                obj.surfaceFeatures.forEach(feature => {
                    const x = Math.cos(feature.angle) * obj.radius * feature.distance;
                    const y = Math.sin(feature.angle) * obj.radius * feature.distance;
                    const size = obj.radius * feature.size;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fillStyle = feature.color;
                    ctx.fill();
                });
                
                // 绘制行星环
                if (obj.hasRing) {
                    ctx.beginPath();
                    ctx.ellipse(0, 0, obj.radius * 1.8, obj.radius * 0.4, 0, 0, Math.PI * 2);
                    ctx.strokeStyle = obj.ringColor;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            } else {
                // 绘制空间站
                // 提取空间站颜色的RGB值
                const stationColor = obj.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                if (stationColor) {
                    const r = stationColor[1];
                    const g = stationColor[2];
                    const b = stationColor[3];
                    
                    // 中心核心
                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, obj.size * 0.5);
                    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${obj.opacity})`);
                    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.5})`);
                    
                    ctx.beginPath();
                    ctx.arc(0, 0, obj.size * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    
                    // 绘制模块
                    obj.moduleData.forEach(module => {
                        const x = Math.cos(module.angle) * module.distance;
                        const y = Math.sin(module.angle) * module.distance;
                        
                        ctx.beginPath();
                        ctx.arc(x, y, module.size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.7})`;
                        ctx.fill();
                        
                        // 连接到中心
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(x, y);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${obj.opacity * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    });
                }
                
                // 绘制灯光
                obj.lights.forEach(light => {
                    const x = Math.cos(light.angle) * light.distance;
                    const y = Math.sin(light.angle) * light.distance;
                    
                    // 闪烁效果
                    light.blinkPhase += light.blinkSpeed;
                    const blinkOpacity = (Math.sin(light.blinkPhase) + 1) / 2;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, light.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${obj.opacity * blinkOpacity})`;
                    ctx.fill();
                });
            }
            
            ctx.restore();
        });
    }
    
    // 绘制虫洞
    function drawWormholes() {
        wormholes.forEach(wormhole => {
            // 更新旋转角度
            wormhole.rotationAngle += wormhole.rotationSpeed;
            
            // 更新脉冲相位
            wormhole.pulsePhase += wormhole.pulseSpeed;
            const pulseFactor = 0.8 + Math.sin(wormhole.pulsePhase) * 0.2;
            
            // 鼠标交互
            const dx = mouse.x - wormhole.x;
            const dy = mouse.y - wormhole.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 300) {
                const force = (1 - distance / 300) * mouseInfluence;
                wormhole.x -= dx * force * 0.02;
                wormhole.y -= dy * force * 0.02;
            }
            
            // 边界检查
            if (wormhole.x < -200) wormhole.x = canvas.width + 200;
            if (wormhole.x > canvas.width + 200) wormhole.x = -200;
            if (wormhole.y < -200) wormhole.y = canvas.height + 200;
            if (wormhole.y > canvas.height + 200) wormhole.y = -200;
            
            ctx.save();
            ctx.translate(wormhole.x, wormhole.y);
            ctx.rotate(wormhole.rotationAngle);
            
            // 提取虫洞颜色的RGB值
            const wormholeColor = wormhole.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
            if (wormholeColor) {
                const r = wormholeColor[1];
                const g = wormholeColor[2];
                const b = wormholeColor[3];
                
                // 绘制虫洞外环
                const outerGradient = ctx.createRadialGradient(0, 0, wormhole.innerRadius, 0, 0, wormhole.radius * pulseFactor);
                outerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
                outerGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${wormhole.opacity * 0.5})`);
                outerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${wormhole.opacity * 0.2})`);
                
                ctx.beginPath();
                ctx.arc(0, 0, wormhole.radius * pulseFactor, 0, Math.PI * 2);
                ctx.fillStyle = outerGradient;
                ctx.fill();
                
                // 绘制虫洞内环
                const innerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, wormhole.innerRadius);
                innerGradient.addColorStop(0, `rgba(0, 0, 0, ${wormhole.opacity})`);
                innerGradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${wormhole.opacity * 0.7})`);
                innerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                ctx.beginPath();
                ctx.arc(0, 0, wormhole.innerRadius, 0, Math.PI * 2);
                ctx.fillStyle = innerGradient;
                ctx.fill();
            }
            
            // 绘制虫洞粒子
            wormhole.particles.forEach(particle => {
                // 更新粒子位置
                particle.angle += particle.speed;
                particle.distance += particle.speed * 2;
                
                // 如果粒子超出虫洞范围，重置
                if (particle.distance > wormhole.radius) {
                    particle.distance = wormhole.innerRadius;
                    particle.angle = Math.random() * Math.PI * 2;
                }
                
                const x = Math.cos(particle.angle) * particle.distance;
                const y = Math.sin(particle.angle) * particle.distance;
                
                ctx.beginPath();
                ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * wormhole.opacity})`;
                ctx.fill();
            });
            
            ctx.restore();
        });
    }
    
    // 鼠标交互处理
    function handleMouseInteraction() {
        // 更新鼠标移动状态
        if (Date.now() - lastMouseMoveTime > 1000) {
            isMouseMoving = false;
        }
        
        // 记录鼠标轨迹
        mouseTrail.push({ x: mouseX, y: mouseY, time: Date.now() });
        
        // 移除旧轨迹点
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 200);
        
        if (isMouseMoving) {
            // 影响星星
            stars.forEach(star => {
                const dx = star.x - mouseX;
                const dy = star.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                const influenceRadius = 250 - (star.layer * 30); // 层级越高，影响范围越小
                
                if (distance < influenceRadius) {
                    // 根据距离计算影响力度
                    const force = (1 - distance / influenceRadius) * 0.8 * (1 / star.layer);
                    const angle = Math.atan2(dy, dx);
                    
                    // 应用力
                    star.x += Math.cos(angle) * force;
                    star.y += Math.sin(angle) * force;
                    
                    // 增加亮度
                    star.opacity = Math.min(1, star.opacity + 0.03);
                    
                    // 临时增强光晕效果
                    if (!star.glow && Math.random() > 0.8) {
                        star.weakGlow = true;
                    }
                } else {
                    // 恢复正常亮度
                    star.opacity = Math.max(0.3, star.opacity - 0.01);
                }
            });
            
            // 影响科技元素
            gridNodes.forEach(node => {
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    // 节点靠近鼠标时增强亮度
                    node.opacity = Math.min(1, node.opacity + 0.05);
                    node.pulse = Math.min(0.1, node.pulse + 0.002);
                }
            });
            
            // 影响科技球体
            techOrbs.forEach(orb => {
                const dx = orb.x - mouseX;
                const dy = orb.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    // 球体靠近鼠标时增强脉冲
                    orb.pulseSpeed = Math.min(0.05, orb.pulseSpeed + 0.001);
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
                    wormhole.rotationSpeed = Math.max(0.005, wormhole.rotationSpeed - 0.0005);
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
});