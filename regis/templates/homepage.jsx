import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Plus,
  Clock,
  Check,
  Copy,
  ChevronRight,
  Search,
  Settings,
  Calendar,
  History,
  Grid,
  Bot,
  MessageSquare,
  Users,
  Maximize2,
  Sparkles,
  Zap,
  Bell,
  X,
  Radio,
  CheckCircle2,
  ListTodo,
  User,
  LogIn
} from 'lucide-react';

export default function App() {
  // Navigation & Tab State (Streamlined options)
  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard' | 'join-meeting' | 'meetings' | 'profile' | 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  // Extended Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@vezun.app',
    role: 'Lead Product Designer',
    department: 'Design Systems',
    status: 'Available', // 'Available' | 'In a Meeting' | 'Do Not Disturb' | 'Away'
    personalMeetingId: 'vez-pmi-789-902',
    preferredMic: 'Built-in Audio (High Definition)',
    preferredCamera: 'HD Web Camera (1080p)',
    timezone: 'UTC -05:00 (Eastern Time)',
    twoFactorEnabled: true,
  });

  // Profile Edit Modal & Edit Form State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@vezun.app',
    role: 'Lead Product Designer',
    department: 'Design Systems',
    timezone: 'UTC -05:00 (Eastern Time)',
  });

  const handleOpenEditProfile = () => {
    setEditProfileForm({
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
      department: userProfile.department,
      timezone: userProfile.timezone,
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name: editProfileForm.name,
      email: editProfileForm.email,
      role: editProfileForm.role,
      department: editProfileForm.department,
      timezone: editProfileForm.timezone,
    }));
    setIsEditingProfile(false);
    showToast('Profile updated successfully!');
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Audio & Video controls
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Modal Dialog Controls
  const [showInstantModal, setShowInstantModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState('');

  // Toast System State
  const [toastMessage, setToastMessage] = useState('');
  const [showToastState, setShowToastState] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Form State for Scheduling
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [newMeetingDate, setNewMeetingDate] = useState('');
  const [newMeetingTime, setNewMeetingTime] = useState('');

  // Workspace & Meeting Settings State
  const [settings, setSettings] = useState({
    noiseSuppression: true,
    hdVideoQuality: true,
    autoMuteOnJoin: false,
    mirrorVideo: true,
    waitingRoom: true,
    lockRoomAfter10: false,
    allowScreenSharing: true,
    passcodeProtection: true,
    autoAiSummary: true,
    liveClosedCaptions: true,
    showLiveClock: true,
    meetingReminders: true,
  });

  const handleSettingToggle = (settingKey, settingLabel) => {
    setSettings((prev) => {
      const updatedValue = !prev[settingKey];
      showToast(`${settingLabel} ${updatedValue ? 'enabled' : 'disabled'}`);
      return { ...prev, [settingKey]: updatedValue };
    });
  };

  // Initial Meetings State
  const [meetings, setMeetings] = useState([
    { id: '1', title: 'Product Roadmap Sync', day: '02', month: 'NOV', time: '10:30 AM', category: 'Product', participants: ['SK', 'AM', 'ED'], code: 'vez-892-prd' },
    { id: '2', title: 'Q4 Revenue Alignment', day: '03', month: 'NOV', time: '11:00 AM', category: 'Executive', participants: ['AM', 'SK'], code: 'vez-411-exec' },
    { id: '3', title: 'Design Token Review', day: '04', month: 'NOV', time: '02:00 PM', category: 'Design', participants: ['ED', 'RV'], code: 'vez-103-[#df]' }
  ]);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setShowToastState(true);
    setTimeout(() => {
      setShowToastState(false);
    }, 3000);
  };

  // Copy Meeting Code Helper
  const handleCopyCode = (code, id) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    showToast(`Code "${code}" copied!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Schedule Form Submit
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!newMeetingTitle || !newMeetingDate || !newMeetingTime) return;

    const dateObj = new Date(newMeetingDate + 'T00:00:00');
    const dayStr = String(dateObj.getDate()).padStart(2, '0');
    const monthStr = dateObj.toLocaleString('en', { month: 'short' }).toUpperCase();
    const timeStr = new Date('2000-01-01T' + newMeetingTime).toLocaleTimeString('en', {
      hour: 'numeric',
      minute: '2-digit'
    });

    const newMeeting = {
      id: String(Date.now()),
      title: newMeetingTitle,
      day: dayStr,
      month: monthStr,
      time: timeStr,
      category: 'General',
      participants: ['RV', 'SK'],
      code: `vez-${Math.floor(100 + Math.random() * 900)}-gen`
    };

    setMeetings([newMeeting, ...meetings]);
    setNewMeetingTitle('');
    setNewMeetingDate('');
    setNewMeetingTime('');
    setShowScheduleModal(false);
    showToast('Meeting scheduled successfully!');
  };

  // Filter meetings by search query
  const filteredMeetings = meetings.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0c0f0c] text-[#f0f4ec] font-sans selection:bg-[#c8f169] selection:text-[#121612]">
      
      {/* App Container */}
      <div className="min-h-screen flex flex-col">

        {/* TOP NAVBAR */}
        <header className="h-16 border-b border-[#232c21] bg-[#0c0f0c] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <a href="#" className="text-xl font-black tracking-tighter text-white flex items-center gap-1">
              VEZUN<span className="text-[#c8f169]">.</span>
            </a>

            {/* Global Search Bar */}
            <div className="hidden sm:flex items-center gap-2 bg-[#141913] border border-[#232c21] px-3 py-1.5 rounded-full text-xs text-[#8b9687] w-60">
              <Search className="w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search meetings or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none w-full text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Clock Display */}
            {settings.showLiveClock && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141913] border border-[#232c21] text-xs font-mono text-[#c8f169]">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            )}

            <button 
              onClick={() => setShowScheduleModal(true)}
              className="px-4 py-2 rounded-full bg-[#c8f169] hover:bg-[#d6fa8b] text-[#121612] font-extrabold text-xs transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Schedule</span>
            </button>

            <div 
              onClick={() => setActiveNav('profile')}
              className="w-8 h-8 rounded-full bg-[#243021] border border-[#3d5239] text-[#c8f169] font-black text-xs flex items-center justify-center cursor-pointer"
            >
              RV
            </div>
          </div>
        </header>

        {/* BODY LAYOUT */}
        <div className="flex-1 flex">

          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="w-56 border-r border-[#232c21] bg-[#0c0f0c] p-4 flex flex-col justify-between sticky top-16 h-[calc(100vh-4rem)]">
            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveNav('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeNav === 'dashboard'
                    ? 'bg-[#232d20] text-[#c8f169] border border-[#3d5239]'
                    : 'text-[#8b9687] hover:bg-[#1c241a] hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveNav('join-meeting')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeNav === 'join-meeting'
                    ? 'bg-[#232d20] text-[#c8f169] border border-[#3d5239]'
                    : 'text-[#8b9687] hover:bg-[#1c241a] hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Join Meeting</span>
              </button>

              <button
                onClick={() => setActiveNav('meetings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeNav === 'meetings'
                    ? 'bg-[#232d20] text-[#c8f169] border border-[#3d5239]'
                    : 'text-[#8b9687] hover:bg-[#1c241a] hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Meetings</span>
              </button>

              <button
                onClick={() => setActiveNav('profile')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeNav === 'profile'
                    ? 'bg-[#232d20] text-[#c8f169] border border-[#3d5239]'
                    : 'text-[#8b9687] hover:bg-[#1c241a] hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveNav('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeNav === 'settings'
                    ? 'bg-[#232d20] text-[#c8f169] border border-[#3d5239]'
                    : 'text-[#8b9687] hover:bg-[#1c241a] hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Setting</span>
              </button>
            </nav>

            <div className="text-[10px] text-[#8b9687] px-2 font-mono">
              VEZUN Workspace v2.0
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 p-6 space-y-6 max-w-5xl mx-auto">
            
            {/* TAB CONTENT: DASHBOARD */}
            {activeNav === 'dashboard' && (
              <div className="space-y-6">

                {/* QUICK ACTIONS BAR */}
                <div className="bg-[#141913] border border-[#242d22] rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-lg font-bold text-white">Welcome Back</h1>
                    <p className="text-xs text-[#8b9687]">Start an instant call or join an existing meeting.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowInstantModal(true)}
                      className="px-4 py-2 rounded-full bg-[#c8f169] hover:bg-[#d6fa8b] text-[#121612] font-extrabold text-xs transition-all flex items-center gap-2"
                    >
                      <Video className="w-4 h-4 fill-[#121612]" />
                      <span>New Meeting</span>
                    </button>

                    <button 
                      onClick={() => setShowJoinModal(true)}
                      className="px-4 py-2 rounded-full bg-[#1c241a] hover:bg-[#232d20] text-white font-bold text-xs border border-[#283526] transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-[#c8f169]" />
                      <span>Join Call</span>
                    </button>
                  </div>
                </div>

                {/* UPCOMING MEETINGS LIST */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-white">Upcoming Meetings</h2>
                    <button onClick={() => setActiveNav('meetings')} className="text-xs font-bold text-[#c8f169]">
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredMeetings.map((m) => (
                      <div 
                        key={m.id}
                        className="bg-[#141913] border border-[#242d22] rounded-xl p-4 space-y-3 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#222d1f] border border-[#283526] text-center flex flex-col items-center justify-center">
                              <b className="text-xs font-black text-white leading-none">{m.day}</b>
                              <small className="text-[8px] font-bold text-[#c8f169] uppercase">{m.month}</small>
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-white">{m.title}</h3>
                              <span className="text-[10px] text-[#8b9687]">{m.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#20271d] flex items-center justify-between">
                          <button 
                            onClick={() => handleCopyCode(m.code, m.id)}
                            className="px-2 py-1 rounded bg-[#192117] text-[#8b9687] hover:text-[#c8f169] text-[10px] font-mono border border-[#263323]"
                          >
                            {m.code}
                          </button>

                          <button 
                            onClick={() => {
                              setJoinCodeInput(m.code);
                              setActiveNav('join-meeting');
                            }}
                            className="px-4 py-1.5 rounded-full bg-[#c8f169] text-[#121612] font-bold text-xs"
                          >
                            Join Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: JOIN MEETING BY ID */}
            {activeNav === 'join-meeting' && (
              <div className="space-y-4 max-w-md">
                <h2 className="text-base font-bold text-white">Join a Meeting</h2>

                <div className="bg-[#141a13] border border-[#253323] rounded-2xl p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8b9687]">Enter Meeting ID or Code</label>
                    <input
                      type="text"
                      placeholder="e.g. vez-892-prd"
                      value={joinCodeInput}
                      onChange={(e) => setJoinCodeInput(e.target.value)}
                      className="w-full bg-[#1c241a] border border-[#293826] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#c8f169] font-mono"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={() => {
                        if (!joinCodeInput.trim()) {
                          showToast('Please enter a valid Meeting ID');
                          return;
                        }
                        showToast(`Connecting to meeting ${joinCodeInput}...`);
                      }}
                      className="w-full py-3 rounded-full bg-[#c8f169] hover:bg-[#d6fa8b] text-[#121612] font-black text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Join Call Now</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: MEETINGS */}
            {activeNav === 'meetings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white">All Scheduled Meetings</h2>
                  <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="px-3 py-1.5 rounded-full bg-[#c8f169] text-[#121612] font-bold text-xs"
                  >
                    ＋ New Meeting
                  </button>
                </div>

                <div className="space-y-3">
                  {meetings.map((m) => (
                    <div key={m.id} className="bg-[#141913] border border-[#242d22] p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#222d1f] border border-[#283526] flex flex-col items-center justify-center">
                          <b className="text-xs font-black text-white">{m.day}</b>
                          <small className="text-[8px] font-bold text-[#c8f169]">{m.month}</small>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-white">{m.title}</h3>
                          <span className="text-[10px] text-[#8b9687]">{m.time}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleCopyCode(m.code, m.id)}
                        className="px-2.5 py-1 rounded bg-[#192117] border border-[#263323] text-[10px] font-mono text-[#8b9687]"
                      >
                        {m.code}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PROFILE */}
            {activeNav === 'profile' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white">User Profile & Account</h2>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleOpenEditProfile}
                      className="px-3 py-1.5 rounded-full bg-[#1c241a] hover:bg-[#232d20] border border-[#3d5239] text-[#c8f169] text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Edit Profile</span>
                    </button>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#192117] border border-[#283526] text-[#c8f169] font-mono">
                      Pro Member
                    </span>
                  </div>
                </div>

                {/* Profile Card Header */}
                <div className="bg-[#141913] border border-[#242d22] p-6 rounded-2xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-[#243021] border-2 border-[#c8f169] text-[#c8f169] font-black text-xl flex items-center justify-center uppercase">
                          {userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'US'}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#141913] ${
                          userProfile.status === 'Available' ? 'bg-[#c8f169]' :
                          userProfile.status === 'In a Meeting' ? 'bg-red-500' :
                          userProfile.status === 'Do Not Disturb' ? 'bg-amber-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-white">{userProfile.name}</h3>
                        <p className="text-xs text-[#8b9687]">{userProfile.email}</p>
                        <p className="text-[11px] text-[#c8f169] mt-0.5">{userProfile.role} • {userProfile.department}</p>
                      </div>
                    </div>

                    {/* Status Selector */}
                    <div className="flex items-center gap-2 bg-[#1c241a] border border-[#283526] p-1.5 rounded-xl">
                      <span className="text-[10px] font-bold text-[#8b9687] pl-2">Status:</span>
                      <select
                        value={userProfile.status}
                        onChange={(e) => {
                          setUserProfile({ ...userProfile, status: e.target.value });
                          showToast(`Status updated to ${e.target.value}`);
                        }}
                        className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer pr-2"
                      >
                        <option value="Available" className="bg-[#141913]">🟢 Available</option>
                        <option value="In a Meeting" className="bg-[#141913]">🔴 In a Meeting</option>
                        <option value="Do Not Disturb" className="bg-[#141913]">🟠 Do Not Disturb</option>
                        <option value="Away" className="bg-[#141913]">⚪ Away</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal Meeting Room ID */}
                  <div className="pt-4 border-t border-[#20271d] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8b9687] tracking-wider block">Personal Meeting ID (PMI)</span>
                      <code className="text-xs font-mono text-[#c8f169] font-bold">{userProfile.personalMeetingId}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleCopyCode(userProfile.personalMeetingId, 'pmi')}
                        className="px-3 py-1.5 rounded-lg bg-[#192117] hover:bg-[#232d20] border border-[#263323] text-xs text-white font-bold transition-all flex items-center gap-1.5"
                      >
                        <Copy className="w-3 h-3 text-[#c8f169]" />
                        <span>Copy PMI</span>
                      </button>
                      <button 
                        onClick={() => {
                          setJoinCodeInput(userProfile.personalMeetingId);
                          setActiveNav('join-meeting');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#c8f169] text-[#121612] text-xs font-black transition-all"
                      >
                        Start PMI Room
                      </button>
                    </div>
                  </div>
                </div>

                {/* Profile Stats & Activity Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#141913] border border-[#242d22] p-4 rounded-xl text-center">
                    <b className="text-lg font-black text-white block">128</b>
                    <span className="text-[10px] text-[#8b9687] uppercase font-bold">Total Calls</span>
                  </div>
                  <div className="bg-[#141913] border border-[#242d22] p-4 rounded-xl text-center">
                    <b className="text-lg font-black text-[#c8f169] block">42h</b>
                    <span className="text-[10px] text-[#8b9687] uppercase font-bold">Time Saved</span>
                  </div>
                  <div className="bg-[#141913] border border-[#242d22] p-4 rounded-xl text-center">
                    <b className="text-lg font-black text-white block">100%</b>
                    <span className="text-[10px] text-[#8b9687] uppercase font-bold">Attendance Rate</span>
                  </div>
                </div>

                {/* Hardware Preferences & Security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Device Preferences */}
                  <div className="bg-[#141913] border border-[#242d22] p-5 rounded-xl space-y-3">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-[#c8f169]" />
                      <span>Audio & Video Defaults</span>
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-[10px] text-[#8b9687] block mb-1">Microphone Device</label>
                        <select className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2 text-white font-medium focus:outline-none">
                          <option>{userProfile.preferredMic}</option>
                          <option>External USB Microphone</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-[#8b9687] block mb-1">Camera Input</label>
                        <select className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2 text-white font-medium focus:outline-none">
                          <option>{userProfile.preferredCamera}</option>
                          <option>Virtual Background Cam</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Security */}
                  <div className="bg-[#141913] border border-[#242d22] p-5 rounded-xl space-y-3">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#c8f169]" />
                      <span>Security & Preferences</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white block">Two-Factor Auth (2FA)</span>
                          <span className="text-[10px] text-[#8b9687]">Extra layer of account protection</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={userProfile.twoFactorEnabled}
                          onChange={(e) => {
                            setUserProfile({...userProfile, twoFactorEnabled: e.target.checked});
                            showToast(e.target.checked ? '2FA Enabled' : '2FA Disabled');
                          }} 
                          className="accent-[#c8f169]" 
                        />
                      </div>

                      <div className="pt-2 border-t border-[#20271d]">
                        <span className="text-[10px] text-[#8b9687] block mb-1">Primary Timezone</span>
                        <div className="text-white text-xs font-mono bg-[#1c241a] p-2 rounded-lg border border-[#293826]">
                          {userProfile.timezone}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB CONTENT: SETTINGS */}
            {activeNav === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white">Workspace & Meeting Settings</h2>
                  <button 
                    onClick={() => showToast('All preferences saved successfully')}
                    className="px-4 py-1.5 rounded-full bg-[#c8f169] text-[#121612] font-black text-xs transition-all hover:bg-[#d6fa8b]"
                  >
                    Save Preferences
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Audio & Video Controls */}
                  <div className="bg-[#141913] border border-[#242d22] p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 text-[#c8f169]" />
                      <span>Audio & Video Controls</span>
                    </h3>

                    <div className="space-y-3 text-xs text-white">
                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">Noise Suppression</span>
                          <span className="text-[10px] text-[#8b9687]">Filter out background chatter & typing</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.noiseSuppression}
                          onChange={() => handleSettingToggle('noiseSuppression', 'Noise Suppression')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">HD Video Quality</span>
                          <span className="text-[10px] text-[#8b9687]">Stream up to 1080p full clarity</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.hdVideoQuality}
                          onChange={() => handleSettingToggle('hdVideoQuality', 'HD Video Quality')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">Auto-Mute on Join</span>
                          <span className="text-[10px] text-[#8b9687]">Join meetings with microphone muted</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.autoMuteOnJoin}
                          onChange={() => handleSettingToggle('autoMuteOnJoin', 'Auto-Mute on Join')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="font-semibold block">Mirror My Video</span>
                          <span className="text-[10px] text-[#8b9687]">Flip webcam view horizontally</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.mirrorVideo}
                          onChange={() => handleSettingToggle('mirrorVideo', 'Mirror My Video')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security & Access Controls */}
                  <div className="bg-[#141913] border border-[#242d22] p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#c8f169]" />
                      <span>Security & Room Rules</span>
                    </h3>

                    <div className="space-y-3 text-xs text-white">
                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">Enable Waiting Room</span>
                          <span className="text-[10px] text-[#8b9687]">Admit participants manually</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.waitingRoom}
                          onChange={() => handleSettingToggle('waitingRoom', 'Waiting Room')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">Lock Room After 10 mins</span>
                          <span className="text-[10px] text-[#8b9687]">Prevent late entrants from joining</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.lockRoomAfter10}
                          onChange={() => handleSettingToggle('lockRoomAfter10', 'Auto Room Lock')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">Allow Screen Sharing</span>
                          <span className="text-[10px] text-[#8b9687]">Let all attendees present screens</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.allowScreenSharing}
                          onChange={() => handleSettingToggle('allowScreenSharing', 'Screen Sharing')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="font-semibold block">Passcode Protection</span>
                          <span className="text-[10px] text-[#8b9687]">Require password for PMI calls</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.passcodeProtection}
                          onChange={() => handleSettingToggle('passcodeProtection', 'Passcode Protection')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* AI Notes & Automation */}
                  <div className="bg-[#141913] border border-[#242d22] p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#c8f169]" />
                      <span>AI Notes & Transcripts</span>
                    </h3>

                    <div className="space-y-3 text-xs text-white">
                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">Auto AI Summary</span>
                          <span className="text-[10px] text-[#8b9687]">Generate action items after call</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.autoAiSummary}
                          onChange={() => handleSettingToggle('autoAiSummary', 'Auto AI Summary')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="font-semibold block">Live Closed Captions</span>
                          <span className="text-[10px] text-[#8b9687]">Real-time speech-to-text subtitles</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.liveClosedCaptions}
                          onChange={() => handleSettingToggle('liveClosedCaptions', 'Live Closed Captions')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notifications & Interface */}
                  <div className="bg-[#141913] border border-[#242d22] p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-[#c8f169]" />
                      <span>Interface & Alerts</span>
                    </h3>

                    <div className="space-y-3 text-xs text-white">
                      <div className="flex items-center justify-between py-1 border-b border-[#20271d]">
                        <div>
                          <span className="font-semibold block">Show Live Clock</span>
                          <span className="text-[10px] text-[#8b9687]">Display real-time clock in top bar</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.showLiveClock}
                          onChange={() => handleSettingToggle('showLiveClock', 'Live Clock display')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="font-semibold block">Meeting Reminders</span>
                          <span className="text-[10px] text-[#8b9687]">Desktop alert 5 mins before call</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings.meetingReminders}
                          onChange={() => handleSettingToggle('meetingReminders', 'Meeting Reminders')}
                          className="accent-[#c8f169] cursor-pointer" 
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </main>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-[#232c21] bg-[#0c0f0c] p-4 text-center text-xs text-[#8b9687]">
          © 2026 VEZUN Inc. Simple & Focused Workspace.
        </footer>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141a13] border border-[#293826] rounded-xl p-5 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Edit Profile Details</h3>
              <button onClick={() => setIsEditingProfile(false)} className="text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8b9687] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editProfileForm.name}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                  className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169]"
                />
              </div>

              <div>
                <label className="block text-[#8b9687] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editProfileForm.email}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, email: e.target.value })}
                  className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#8b9687] mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.role}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, role: e.target.value })}
                    className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169]"
                  />
                </div>
                <div>
                  <label className="block text-[#8b9687] mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.department}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, department: e.target.value })}
                    className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8b9687] mb-1">Timezone</label>
                <input
                  type="text"
                  required
                  value={editProfileForm.timezone}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, timezone: e.target.value })}
                  className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169] font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-full bg-[#1c241a] text-white font-bold text-xs border border-[#283526]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#c8f169] text-[#121612] font-black text-xs hover:bg-[#d6fa8b]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141a13] border border-[#293826] rounded-xl p-5 w-full max-w-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Schedule Meeting</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8b9687] mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Meeting Title"
                  value={newMeetingTitle}
                  onChange={(e) => setNewMeetingTitle(e.target.value)}
                  className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#8b9687] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newMeetingDate}
                    onChange={(e) => setNewMeetingDate(e.target.value)}
                    className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169]"
                  />
                </div>
                <div>
                  <label className="block text-[#8b9687] mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={newMeetingTime}
                    onChange={(e) => setNewMeetingTime(e.target.value)}
                    className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#c8f169]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#c8f169] text-[#121612] font-bold text-xs"
              >
                Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* INSTANT MODAL */}
      {showInstantModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141a13] border border-[#293826] rounded-xl p-5 w-full max-w-xs text-center space-y-3">
            <h3 className="text-sm font-bold text-white">Start New Meeting</h3>
            <p className="text-xs text-[#8b9687]">Enter the private meeting room now.</p>
            <button
              onClick={() => {
                setShowInstantModal(false);
                setActiveNav('meeting-room');
                showToast('Joined instant call!');
              }}
              className="w-full py-2.5 rounded-full bg-[#c8f169] text-[#121612] font-bold text-xs"
            >
              Enter Room
            </button>
          </div>
        </div>
      )}

      {/* JOIN MODAL */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141a13] border border-[#293826] rounded-xl p-5 w-full max-w-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Join Meeting</h3>
              <button onClick={() => setShowJoinModal(false)} className="text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter meeting code"
              value={joinCodeInput}
              onChange={(e) => setJoinCodeInput(e.target.value)}
              className="w-full bg-[#1c241a] border border-[#293826] rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-[#c8f169]"
            />
            <button
              onClick={() => {
                setShowJoinModal(false);
                setActiveNav('meeting-room');
                showToast(`Joined call: ${joinCodeInput || 'vez-892-prd'}`);
              }}
              className="w-full py-2.5 rounded-full bg-[#c8f169] text-[#121612] font-bold text-xs"
            >
              Join Call
            </button>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div
        className={`fixed bottom-5 right-5 bg-[#192218] border border-[#2c3e29] text-[#c8f169] px-4 py-2.5 rounded-full text-xs font-bold shadow-xl transition-all duration-300 z-50 flex items-center gap-2 ${
          showToastState ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}