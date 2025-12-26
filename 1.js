// 创建粒子效果
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        
        const colors = [
            'rgba(255, 107, 107, 0.5)',
            'rgba(168, 237, 234, 0.5)',
            'rgba(212, 252, 121, 0.5)',
            'rgba(166, 192, 254, 0.5)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// 点击特效
document.addEventListener('click', function(e) {
    const effect = document.createElement('div');
    effect.classList.add('click-effect');
    effect.style.left = `${e.clientX}px`;
    effect.style.top = `${e.clientY}px`;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 600);
});

// 音乐播放器功能
class MusicPlayer {
    constructor() {
        this.currentTrack = 0;
        this.isPlaying = false;
        this.volume = 50;
        this.tracks = [
            {
                title: "校园时光",
                artist: "莫奕",
                cover: "🎵",
                color: "linear-gradient(135deg, #ff9a9e, #fad0c4)"
            },
            {
                title: "青春回忆",
                artist: "小微",
                cover: "🎶",
                color: "linear-gradient(135deg, #a8edea, #fed6e3)"
            },
            {
                title: "梦想启航",
                artist: "黑皮",
                cover: "🎼",
                color: "linear-gradient(135deg, #d4fc79, #96e6a1)"
            },
            {
                title: "夜色温柔",
                artist: "乙游",
                cover: "🎹",
                color: "linear-gradient(135deg, #a6c0fe, #f68084)"
            }
        ];
        
        this.audioContext = null;
        this.audioElement = null;
        this.init();
    }
    
    init() {
        this.createAudioElement();
        this.bindEvents();
        this.updateTrackInfo();
    }
    
    createAudioElement() {
        // 创建虚拟音频元素（实际项目中可以替换为真实音频文件）
        this.audioElement = document.createElement('audio');
        this.audioElement.volume = this.volume / 100;
        
        // 模拟音频源（实际项目中需要真实音频文件）
        const source = document.createElement('source');
        source.type = 'audio/mpeg';
        this.audioElement.appendChild(source);
    }
    
    bindEvents() {
        const playBtn = document.getElementById('playBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const closeBtn = document.getElementById('closeMusic');
        
        playBtn.addEventListener('click', () => this.togglePlay());
        prevBtn.addEventListener('click', () => this.previousTrack());
        nextBtn.addEventListener('click', () => this.nextTrack());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        closeBtn.addEventListener('click', () => this.closePlayer());
        
        // 模拟音频结束事件
        this.audioElement.addEventListener('ended', () => {
            this.nextTrack();
        });
    }
    
    togglePlay() {
        const playBtn = document.getElementById('playBtn');
        
        if (this.isPlaying) {
            this.pause();
            playBtn.textContent = '▶️';
            playBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
        } else {
            this.play();
            playBtn.textContent = '⏸️';
            playBtn.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';
            
            // 添加播放动画效果
            this.createVisualizer();
        }
        this.isPlaying = !this.isPlaying;
    }
    
    play() {
        // 模拟播放（实际项目中播放真实音频）
        console.log(`播放: ${this.tracks[this.currentTrack].title}`);
        
        // 创建音频可视化效果
        this.startVisualization();
    }
    
    pause() {
        // 模拟暂停
        console.log(`暂停: ${this.tracks[this.currentTrack].title}`);
        this.stopVisualization();
    }
    
    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.updateTrackInfo();
        if (this.isPlaying) {
            this.play();
        }
        
        // 添加切换动画
        this.animateTrackChange();
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.updateTrackInfo();
        if (this.isPlaying) {
            this.play();
        }
        
        // 添加切换动画
        this.animateTrackChange();
    }
    
    setVolume(value) {
        this.volume = value;
        if (this.audioElement) {
            this.audioElement.volume = value / 100;
        }
        
        // 更新音量显示
        const volumeDisplay = document.querySelector('.volume-display');
        if (volumeDisplay) {
            volumeDisplay.textContent = `${value}%`;
        }
    }
    
    updateTrackInfo() {
        const track = this.tracks[this.currentTrack];
        const musicCover = document.querySelector('.music-cover');
        const musicTitle = document.querySelector('.music-details h3');
        const musicArtist = document.querySelector('.music-details p');
        
        if (musicCover) {
            musicCover.textContent = track.cover;
            musicCover.style.background = track.color;
        }
        if (musicTitle) musicTitle.textContent = track.title;
        if (musicArtist) musicArtist.textContent = track.artist;
        
        // 更新播放器标题
        const playerHeader = document.querySelector('.player-header span');
        if (playerHeader) {
            playerHeader.textContent = `🎵 ${track.title} - ${track.artist}`;
        }
    }
    
    animateTrackChange() {
        const musicCover = document.querySelector('.music-cover');
        if (musicCover) {
            musicCover.style.animation = 'none';
            setTimeout(() => {
                musicCover.style.animation = 'spin 0.5s ease';
            }, 10);
        }
    }
    
    createVisualizer() {
        // 创建简单的音频可视化效果
        const visualizer = document.querySelector('.visualizer');
        if (!visualizer) {
            const playerContent = document.querySelector('.player-content');
            const newVisualizer = document.createElement('div');
            newVisualizer.className = 'visualizer';
            newVisualizer.innerHTML = `
                <div class="visualizer-bars">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            `;
            playerContent.appendChild(newVisualizer);
        }
    }
    
    startVisualization() {
        const bars = document.querySelectorAll('.visualizer .bar');
        bars.forEach((bar, index) => {
            bar.style.animation = `pulse ${0.5 + index * 0.1}s infinite alternate`;
        });
    }
    
    stopVisualization() {
        const bars = document.querySelectorAll('.visualizer .bar');
        bars.forEach(bar => {
            bar.style.animation = 'none';
        });
    }
    
    closePlayer() {
        const musicPlayer = document.getElementById('musicPlayer');
        musicPlayer.style.display = 'none';
        this.pause();
        this.isPlaying = false;
        
        const playBtn = document.getElementById('playBtn');
        playBtn.textContent = '▶️';
        playBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
    }
}

// 弹窗管理
const bookListModal = document.getElementById('bookListModal');
const musicPlayer = document.getElementById('musicPlayer');
const commentModal = document.getElementById('commentModal');

// 初始化音乐播放器
let musicPlayerInstance;

// 书单功能
document.getElementById('bookListBtn').addEventListener('click', function() {
    bookListModal.style.display = 'block';
});

// 音乐播放器功能
document.getElementById('musicBtn').addEventListener('click', function() {
    if (!musicPlayerInstance) {
        musicPlayerInstance = new MusicPlayer();
    }
    musicPlayer.style.display = 'block';
});

// 留言功能
document.getElementById('commentBtn').addEventListener('click', function() {
    commentModal.style.display = 'block';
});

document.getElementById('submitComment').addEventListener('click', function() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();
    
    if (commentText) {
        const commentsList = document.querySelector('.comments-list');
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="comment-avatar">你</div>
            <div class="comment-content">
                <h4>你</h4>
                <p>${commentText}</p>
                <span class="comment-time">刚刚</span>
            </div>
        `;
        
        commentsList.insertBefore(newComment, commentsList.firstChild);
        commentInput.value = '';
        
        // 添加动画效果
        newComment.style.animation = 'modalSlideIn 0.3s ease';
        
        // 显示成功提示
        this.textContent = '发布成功!';
        this.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
        
        setTimeout(() => {
            this.textContent = '发布留言';
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
        }, 2000);
    }
});

// 关闭弹窗
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// 点击弹窗外部关闭
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// 侧边栏其他功能
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        if (this.id === 'bookListBtn' || this.id === 'musicBtn' || this.id === 'commentBtn') {
            return; // 这些功能已经单独处理
        }
        
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1.15)';
        }, 150);
        
        const icon = this.querySelector('.sidebar-icon').textContent;
        let message = '';
        
        switch(icon) {
            case '❤️':
                message = '文章已收藏！';
                // 添加收藏动画
                this.querySelector('.sidebar-icon').style.animation = 'heartBeat 0.6s ease';
                setTimeout(() => {
                    this.querySelector('.sidebar-icon').style.animation = '';
                }, 600);
                break;
            case '🌙':
                message = '切换夜间模式';
                document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
                break;
            case '🔍':
                message = '打开搜索框';
                break;
            case '📱':
                message = '分享页面';
                break;
            case '⬆️':
                message = '回到顶部';
                window.scrollTo({top: 0, behavior: 'smooth'});
                break;
        }
        
        if(message && !['🌙', '⬆️'].includes(icon)) {
            // 创建自定义提示而不是alert
            this.showCustomAlert(message);
        }
    });
});

// 自定义提示函数
Element.prototype.showCustomAlert = function(message) {
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        z-index: 10000;
        animation: fadeInOut 2s ease;
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 2000);
};

// 分类标签交互
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function() {
        this.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
        this.style.color = 'white';
        
        setTimeout(() => {
            this.style.background = 'linear-gradient(45deg, #a8edea, #fed6e3)';
            this.style.color = 'inherit';
        }, 500);
    });
});

// 图片点击放大效果
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(1.5)';
        this.style.zIndex = '100';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        }, 1000);
    });
});

// 初始化
window.addEventListener('load', function() {
    createParticles();
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            from { height: 5px; background: #ff6b6b; }
            to { height: 20px; background: #4ecdc4; }
        }
        
        @keyframes heartBeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.3); }
            50% { transform: scale(1); }
            75% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -60%); }
            20% { opacity: 1; transform: translate(-50%, -50%); }
            80% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -40%); }
        }
        
        .visualizer {
            margin-top: 20px;
            padding: 10px;
            background: rgba(0,0,0,0.05);
            border-radius: 10px;
        }
        
        .visualizer-bars {
            display: flex;
            align-items: end;
            justify-content: space-between;
            height: 30px;
            gap: 3px;
        }
        
        .visualizer .bar {
            flex: 1;
            background: linear-gradient(to top, #ff6b6b, #4ecdc4);
            border-radius: 2px;
            min-height: 5px;
        }
        
        .volume-display {
            font-size: 0.8em;
            color: #666;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
});
