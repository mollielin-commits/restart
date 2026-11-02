import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, DollarSign, Plus, Trash2, Edit3, CheckCircle, 
  Circle, Navigation, Upload, X, FileText, ChevronRight, PieChart, 
  Download, ExternalLink, ArrowRight, Image as ImageIcon, Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [notification, setNotification] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('全部');

  // 每日行程 State
  const [itineraries, setItineraries] = useState(() => {
    const saved = localStorage.getItem('eur_2027_itineraries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 1,
        day: 1,
        date: '2027.6.27',
        time: '09:00',
        title: '抵達巴黎戴高樂機場',
        location: 'Paris Charles de Gaulle Airport',
        category: '交通',
        description: '搭乘長榮航空抵達巴黎，出關領取行李後搭乘 RER B 線前往市區飯店。',
        completed: false,
        files: [],
        linkedGuideId: ''
      },
      {
        id: 2,
        day: 1,
        date: '2027.6.27',
        time: '14:00',
        title: '塞納河畔左岸漫步與迎賓晚餐',
        location: 'Café de Flore, Paris',
        category: '餐飲',
        description: '在著名的花神咖啡廳享用下午茶，隨後漫步塞納河畔，晚上品嚐正宗法式牛排餐。',
        completed: false,
        files: [],
        linkedGuideId: ''
      }
    ];
  });

  // 景點美饌 State
  const [guides, setGuides] = useState(() => {
    const saved = localStorage.getItem('eur_2027_guides');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 1,
        title: '艾菲爾鐵塔 (Tour Eiffel)',
        category: '景點導覽',
        location: 'Champ de Mars, Paris',
        imageUrl: 'https://placehold.co/600x400/1e293b/fff?text=Eiffel+Tower',
        background: '建於1889年，為紀念法國大革命百年及巴黎世界博覽會而建，是巴黎的最高地標與浪漫象徵。',
        features: '• 360度俯瞰巴黎全景\n• 璀璨燈光秀（每小時整點閃爍5分鐘）\n• 建議預約日落時段登塔',
        notes: '已預約 18:00 登塔門票，建議提早 20 分鐘抵達安檢口。',
        files: []
      },
      {
        id: 2,
        title: 'Le Comptoir du Relais',
        category: '美食推薦',
        location: '9 Carrefour de l Odeon, Paris',
        imageUrl: 'https://placehold.co/600x400/334155/fff?text=French+Bistro',
        background: '位於聖日耳曼德佩區的傳奇小酒館，由名廚 Yves Camdeborde 主理，融合傳統法式風味與現代料理巧思。',
        features: '• 招牌油封鴨腿香氣濃郁\n• 傳奇千層派 (Mille-feuille) 酥脆滑順\n• 不接受預約，建議開門前 30 分鐘排隊',
        notes: '午餐與晚餐時段一位難求，建議提早前往卡位。',
        files: []
      }
    ];
  });

  // 公款記帳 State
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('eur_2027_expenses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 1,
        date: '2027.6.27',
        category: '餐飲',
        description: '花神咖啡廳迎賓下午茶',
        amountEur: 68.50,
        paidBy: '阿韜',
        notes: '家族公費支付'
      },
      {
        id: 2,
        date: '2027.6.27',
        category: '交通',
        description: '機場至市區 RER B 車票 (4人)',
        amountEur: 44.00,
        paidBy: '爸爸',
        notes: '刷卡支付'
      }
    ];
  });

  const [totalBudget, setTotalBudget] = useState(() => {
    const saved = localStorage.getItem('eur_2027_budget');
    return saved ? Number(saved) : 5000;
  });

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(totalBudget);

  // 同步寫入 LocalStorage
  useEffect(() => {
    localStorage.setItem('eur_2027_itineraries', JSON.stringify(itineraries));
  }, [itineraries]);

  useEffect(() => {
    localStorage.setItem('eur_2027_guides', JSON.stringify(guides));
  }, [guides]);

  useEffect(() => {
    localStorage.setItem('eur_2027_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('eur_2027_budget', JSON.stringify(totalBudget));
  }, [totalBudget]);

  // Modal 狀態
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [itineraryForm, setItineraryForm] = useState({
    day: 1,
    date: '2027.6.27',
    time: '10:00',
    title: '',
    location: '',
    category: '景點',
    description: '',
    linkedGuideId: '',
    files: []
  });

  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [guideForm, setGuideForm] = useState({
    title: '',
    category: '景點導覽',
    location: '',
    imageUrl: '',
    background: '',
    features: '',
    notes: '',
    files: []
  });

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseForm, setExpenseForm] = useState({
    date: '2027.6.27',
    category: '餐飲',
    description: '',
    amountEur: 0,
    paidBy: '阿韜',
    notes: ''
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [highlightGuideId, setHighlightGuideId] = useState(null);

  // 導出備份資料 JSON
  const handleExportData = () => {
    const data = {
      itineraries,
      guides,
      expenses,
      totalBudget,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `2027歐洲行備份_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("📥 備份檔案已成功下載！");
  };

  // 匯入備份資料 JSON
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.itineraries) {
          setItineraries(parsed.itineraries);
        }
        if (parsed.guides) {
          setGuides(parsed.guides);
        }
        if (parsed.expenses) {
          setExpenses(parsed.expenses);
        }
        if (parsed.totalBudget) {
          setTotalBudget(parsed.totalBudget);
        }
        showNotification("📤 成功載入最新備份資料！");
      } catch (err) {
        showNotification("⚠️ 匯入失敗：檔案格式不正確");
      }
    };
    reader.readAsText(file);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // 檔案上傳 Helper
  const handleFileUpload = (e, callback) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          resolve({
            name: file.name,
            url: uploadEvent.target.result,
            type: file.type.startsWith('image/') ? 'image' : 'file'
          });
        };
        reader.readAsDataURL(file);
      });
    })).then(newFiles => {
      callback(newFiles);
    });
  };

  // 跨分頁跳轉定位
  const jumpToTabAndHighlight = (tabName, keyword, linkedGuideId) => {
    setActiveTab(tabName);
    let matched = null;
    if (linkedGuideId) {
      matched = guides.find(g => g.id === Number(linkedGuideId));
    }
    if (!matched && keyword) {
      matched = guides.find(g => g.title.includes(keyword) || keyword.includes(g.title));
    }
    if (matched) {
      setHighlightGuideId(matched.id);
      setTimeout(() => {
        const el = document.getElementById(`guide-card-${matched.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
    showNotification(`已切換至景點美饌並定位`);
  };

  // 行程 CRUD
  const handleSaveItinerary = (e) => {
    e.preventDefault();
    if (editingItinerary) {
      setItineraries(itineraries.map(item => item.id === editingItinerary.id ? { ...itineraryForm, id: item.id, completed: item.completed } : item));
      showNotification("✅ 行程已成功更新！");
    } else {
      const newItem = { ...itineraryForm, id: Date.now(), completed: false };
      setItineraries([...itineraries, newItem]);
      showNotification("✨ 新增行程成功！");
    }
    setIsItineraryModalOpen(false);
    setEditingItinerary(null);
  };

  const deleteItinerary = (id) => {
    if (window.confirm("確定要刪除此筆行程嗎？")) {
      setItineraries(itineraries.filter(item => item.id !== id));
      showNotification("🗑️ 行程已刪除");
    }
  };

  // 景點導覽 CRUD
  const handleSaveGuide = (e) => {
    e.preventDefault();
    if (editingGuide) {
      setGuides(guides.map(g => g.id === editingGuide.id ? { ...guideForm, id: g.id } : g));
      showNotification("✅ 景點美饌已更新！");
    } else {
      const newGuide = { ...guideForm, id: Date.now() };
      setGuides([...guides, newGuide]);
      showNotification("✨ 新增景點美饌成功！");
    }
    setIsGuideModalOpen(false);
    setEditingGuide(null);
  };

  const deleteGuide = (id) => {
    if (window.confirm("確定要刪除此筆景點美饌嗎？")) {
      setGuides(guides.filter(g => g.id !== id));
      showNotification("🗑️ 項目已刪除");
    }
  };

  // 記帳 CRUD
  const handleSaveExpense = (e) => {
    e.preventDefault();
    if (editingExpense) {
      setExpenses(expenses.map(ex => ex.id === editingExpense.id ? { ...expenseForm, id: ex.id, amountEur: Number(expenseForm.amountEur) } : ex));
      showNotification("✅ 記帳紀錄已更新！");
    } else {
      const newEx = { ...expenseForm, id: Date.now(), amountEur: Number(expenseForm.amountEur) };
      setExpenses([...expenses, newEx]);
      showNotification("✨ 新增記帳成功！");
    }
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    if (window.confirm("確定要刪除此筆記帳嗎？")) {
      setExpenses(expenses.filter(ex => ex.id !== id));
      showNotification("🗑️ 記帳已刪除");
    }
  };

  // 記帳統計計算
  const totalSpent = expenses.reduce((acc, curr) => acc + Number(curr.amountEur || 0), 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetPercentage = totalBudget > 0 ? Math.min(Math.round((totalSpent / totalBudget) * 100), 100) : 0;

  const filteredItineraries = itineraries.filter(item => {
    if (categoryFilter === '全部') return true;
    return item.category === categoryFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* 頂部導航橫幅 */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">2027歐洲行 - 歐洲家族旅遊與記帳</h1>
              <p className="text-xs text-blue-200">即時資料自動儲存與預算管控系統</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold text-white transition cursor-pointer border border-white/20 shadow-sm"
              title="匯出目前所有行程與記帳備份"
            >
              <Download className="w-3.5 h-3.5 text-emerald-300" />
              <span>匯出備份</span>
            </button>
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition cursor-pointer shadow-sm">
              <Upload className="w-3.5 h-3.5" />
              <span>匯入資料</span>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
          </div>
        </div>

        {/* 頂部即時通知提示 */}
        {notification && (
          <div className="bg-emerald-500 text-white text-center py-1.5 text-xs font-bold animate-fadeIn shadow-md">
            {notification}
          </div>
        )}

        {/* 主導航頁籤 */}
        <div className="max-w-5xl mx-auto px-4 flex border-t border-white/10">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 py-3 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
              activeTab === 'itinerary' ? 'border-amber-400 text-amber-300 bg-white/5' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>每日行程</span>
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`flex-1 py-3 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
              activeTab === 'guides' ? 'border-amber-400 text-amber-300 bg-white/5' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>景點美饌</span>
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 py-3 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
              activeTab === 'expenses' ? 'border-amber-400 text-amber-300 bg-white/5' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>公款記帳 & 預算</span>
          </button>
        </div>
      </header>

      {/* 內容區塊 */}
      <main className="max-w-5xl mx-auto px-4 pt-6">
        {/* TAB 1: 每日行程 */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>每日行程規劃</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">點擊日期天數標籤與附件預覽，支援導航與類別過濾</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="全部">全部類別</option>
                  <option value="景點">🏛️ 景點</option>
                  <option value="交通">🚆 交通</option>
                  <option value="餐飲">🍷 餐飲</option>
                  <option value="購物">🛍️ 購物</option>
                  <option value="住宿">🏨 住宿</option>
                </select>
                <button
                  onClick={() => {
                    setEditingItinerary(null);
                    setItineraryForm({ day: 1, date: '2027.6.27', time: '10:00', title: '', location: '', category: '景點', description: '', linkedGuideId: '', files: [] });
                    setIsItineraryModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer ml-auto sm:ml-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增行程</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredItineraries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-sm text-slate-400">目前沒有符合條件的行程項目</p>
                </div>
              ) : (
                filteredItineraries.map((item) => {
                  const badgeColor = 
                    item.category === '景點' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    item.category === '交通' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                    item.category === '餐飲' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                    item.category === '購物' ? 'bg-pink-100 text-pink-800 border-pink-300' : 'bg-purple-100 text-purple-800 border-purple-300';

                  return (
                    <div 
                      key={item.id} 
                      className={`bg-white rounded-2xl p-5 shadow-sm border transition ${item.completed ? 'opacity-60 bg-slate-50/80 border-slate-200' : 'border-slate-200 hover:shadow-md'}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3 flex-wrap">
                          <button
                            onClick={() => {
                              const updated = itineraries.map(i => i.id === item.id ? { ...i, completed: !i.completed } : i);
                              setItineraries(updated);
                            }}
                            className="text-slate-400 hover:text-blue-600 transition cursor-pointer"
                          >
                            {item.completed ? <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" /> : <Circle className="w-5 h-5" />}
                          </button>
                          
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white shadow-2xs">
                            {item.date} (第{item.day}天)
                          </span>

                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}>
                            {item.category}
                          </span>

                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {item.time}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center">
                          <button
                            onClick={() => jumpToTabAndHighlight('guides', item.title, item.linkedGuideId)}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                            title="前往景點美饌查看對應詳情"
                          >
                            <span>🧭 查看對應景點美饌</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => {
                              setEditingItinerary(item);
                              setItineraryForm({ ...item, linkedGuideId: item.linkedGuideId || '' });
                              setIsItineraryModalOpen(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                            title="編輯行程"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItinerary(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="刪除行程"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-3 space-y-2">
                        <h3 className={`text-base font-bold text-slate-900 ${item.completed ? 'line-through text-slate-500' : ''}`}>
                          {item.title}
                        </h3>

                        {item.location && (
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                              <span className="font-medium">{item.location}</span>
                            </div>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition"
                            >
                              <Navigation className="w-3.5 h-3.5" />
                              <span>Google 導航</span>
                            </a>
                          </div>
                        )}

                        {item.description && (
                          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                            {item.description}
                          </p>
                        )}

                        {item.files && item.files.length > 0 && (
                          <div className="pt-2">
                            <p className="text-xs font-semibold text-slate-500 mb-2">附件與照片 ({item.files.length})：</p>
                            <div className="flex flex-wrap gap-2">
                              {item.files.map((file, idx) => (
                                <div key={idx} className="relative group">
                                  {file.type === 'image' ? (
                                    <img
                                      src={file.url}
                                      alt={file.name}
                                      onClick={() => setPreviewImage(file.url)}
                                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 cursor-pointer hover:opacity-95 shadow-2xs"
                                    />
                                  ) : (
                                    <a
                                      href={file.url}
                                      download={file.name}
                                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200"
                                    >
                                      <FileText className="w-4 h-4 text-blue-600" />
                                      <span className="max-w-[100px] truncate">{file.name}</span>
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: 景點美饌 */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span>景點美饌與深度導覽</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">收集餐廳、景點背景、特色亮點與完整攻略資訊</p>
              </div>
              <button
                onClick={() => {
                  setEditingGuide(null);
                  setGuideForm({ title: '', category: '景點導覽', location: '', imageUrl: '', background: '', features: '', notes: '', files: [] });
                  setIsGuideModalOpen(true);
                }}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>新增景點美饌</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <div 
                  key={guide.id} 
                  id={`guide-card-${guide.id}`}
                  className={`bg-white rounded-3xl overflow-hidden shadow-sm border transition flex flex-col justify-between ${
                    highlightGuideId === guide.id ? 'ring-4 ring-indigo-500 border-indigo-500 shadow-lg' : 'border-slate-200 hover:shadow-md'
                  }`}
                >
                  <div>
                    {guide.imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={guide.imageUrl}
                          alt={guide.title}
                          onClick={() => setPreviewImage(guide.imageUrl)}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
                            {guide.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-5 space-y-3.5">
                      {!guide.imageUrl && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {guide.category}
                          </span>
                        </div>
                      )}

                      <h3 className="text-base font-bold text-slate-900">{guide.title}</h3>

                      {guide.location && (
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                            <span className="font-medium">{guide.location}</span>
                          </div>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(guide.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>導航</span>
                          </a>
                        </div>
                      )}

                      {guide.background && (
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                            <span>📖 背景介紹</span>
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {guide.background}
                          </p>
                        </div>
                      )}

                      {guide.features && (
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-amber-800 flex items-center gap-1">
                            <span>✨ 特色亮點</span>
                          </p>
                          <div className="text-xs text-slate-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100 whitespace-pre-line leading-relaxed">
                            {guide.features}
                          </div>
                        </div>
                      )}

                      {guide.notes && (
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                            <span>💡 攻略與注意事項</span>
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                            {guide.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingGuide(guide);
                        setGuideForm({ ...guide });
                        setIsGuideModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>編輯</span>
                    </button>
                    <button
                      onClick={() => deleteGuide(guide.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>刪除</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 公款記帳 & 預算 */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 text-white shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-blue-300 tracking-wider uppercase">Budget Overview</span>
                  <h2 className="text-xl font-extrabold tracking-tight mt-0.5">歐洲家族旅遊公款與預算管控</h2>
                </div>
                <div className="flex items-center gap-2">
                  {isEditingBudget ? (
                    <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
                      <input
                        type="number"
                        value={budgetInput}
                        onChange={(e) => setBudgetInput(e.target.value)}
                        className="w-24 text-xs px-2 py-1 bg-white text-slate-900 rounded-lg font-bold outline-none"
                      />
                      <button
                        onClick={() => {
                          setTotalBudget(Number(budgetInput));
                          setIsEditingBudget(false);
                          showNotification("💾 總預算已更新！");
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg cursor-pointer"
                      >
                        儲存
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setBudgetInput(totalBudget);
                        setIsEditingBudget(true);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold border border-white/20 transition cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                      <span>設定總預算 (€{totalBudget})</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">預算消耗進度 ({budgetPercentage}%)</span>
                  <span className={remainingBudget < 0 ? 'text-rose-400 font-bold' : 'text-emerald-300 font-bold'}>
                    {remainingBudget >= 0 ? `剩餘 €${remainingBudget.toFixed(2)}` : `超支 €${Math.abs(remainingBudget).toFixed(2)}`}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      budgetPercentage > 90 ? 'bg-rose-500' : budgetPercentage > 75 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-xs text-blue-200 mb-1">總預算 (€)</p>
                  <p className="text-lg sm:text-xl font-black text-white">€{totalBudget.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-xs text-amber-200 mb-1">已花費 (€)</p>
                  <p className="text-lg sm:text-xl font-black text-amber-300">€{totalSpent.toFixed(2)}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-xs text-emerald-200 mb-1">剩餘預算 (€)</p>
                  <p className={`text-lg sm:text-xl font-black ${remainingBudget >= 0 ? 'text-emerald-300' : 'text-rose-400'}`}>
                    €{remainingBudget.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    <span>公款收支明細清單</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">即時記錄每一筆家族旅遊開銷與代墊情形</p>
                </div>
                <button
                  onClick={() => {
                    setEditingExpense(null);
                    setExpenseForm({ date: '2027.6.27', category: '餐飲', description: '', amountEur: 0, paidBy: '爸爸', notes: '' });
                    setIsExpenseModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增公款記帳</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3 rounded-l-xl">日期</th>
                      <th className="p-3">類別</th>
                      <th className="p-3">款項說明</th>
                      <th className="p-3 text-right">金額 (€)</th>
                      <th className="p-3">付款/代墊者</th>
                      <th className="p-3">備註</th>
                      <th className="p-3 rounded-r-xl text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {expenses.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-slate-400">目前尚無記帳紀錄</td>
                      </tr>
                    ) : (
                      expenses.map((ex) => (
                        <tr key={ex.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-semibold text-slate-700">{ex.date}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
                              {ex.category}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{ex.description}</td>
                          <td className="p-3 text-right font-black text-blue-600">€{Number(ex.amountEur).toFixed(2)}</td>
                          <td className="p-3 text-slate-600 font-medium">{ex.paidBy}</td>
                          <td className="p-3 text-slate-500">{ex.notes}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingExpense(ex);
                                  setExpenseForm({ ...ex });
                                  setIsExpenseModalOpen(true);
                                }}
                                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteExpense(ex.id)}
                                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 行程新增/編輯 彈窗 */}
      {isItineraryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsItineraryModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-4">{editingItinerary ? '編輯行程項目' : '新增行程項目'}</h3>

            <form onSubmit={handleSaveItinerary} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">天數 (Day)</label>
                  <input
                    type="number"
                    min="1"
                    value={itineraryForm.day}
                    onChange={(e) => setItineraryForm({ ...itineraryForm, day: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">日期格式</label>
                  <input
                    type="text"
                    value={itineraryForm.date}
                    onChange={(e) => setItineraryForm({ ...itineraryForm, date: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    placeholder="2027.6.27"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">時間</label>
                  <input
                    type="text"
                    value={itineraryForm.time}
                    onChange={(e) => setItineraryForm({ ...itineraryForm, time: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    placeholder="09:00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">標題</label>
                  <input
                    type="text"
                    value={itineraryForm.title}
                    onChange={(e) => setItineraryForm({ ...itineraryForm, title: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    placeholder="例如：羅浮宮導覽"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">行程分類</label>
                  <select
                    value={itineraryForm.category}
                    onChange={(e) => setItineraryForm({ ...itineraryForm, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  >
                    <option value="景點">🏛️ 景點</option>
                    <option value="交通">🚆 交通</option>
                    <option value="餐飲">🍷 餐飲</option>
                    <option value="購物">🛍️ 購物</option>
                    <option value="住宿">🏨 住宿</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">地點 (Google 導航用)</label>
                  <input
                    type="text"
                    value={itineraryForm.location}
                    onChange={(e) => setItineraryForm({ ...itineraryForm, location: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    placeholder="例如：Louvre Museum, Paris"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">關聯景點美饌卡片</label>
                  <select
                    value={itineraryForm.linkedGuideId || ''}
                    onChange={(e) => setItineraryForm({ ...itineraryForm, linkedGuideId: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none cursor-pointer"
                  >
                    <option value="">-- 不指定 / 自動比對標題 --</option>
                    {guides.map(g => (
                      <option key={g.id} value={g.id}>[{g.category}] {g.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">詳細說明</label>
                <textarea
                  rows="3"
                  value={itineraryForm.description}
                  onChange={(e) => setItineraryForm({ ...itineraryForm, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  placeholder="輸入行程細節..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">上傳照片或附件檔案</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e, (newFiles) => {
                    setItineraryForm(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
                  })}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {itineraryForm.files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {itineraryForm.files.map((f, idx) => (
                      <div key={idx} className="relative bg-slate-100 px-2.5 py-1 rounded-lg text-xs flex items-center gap-2">
                        <span>{f.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setItineraryForm(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsItineraryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm"
                >
                  儲存行程
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 景點美饌新增/編輯 彈窗 */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsGuideModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-4">{editingGuide ? '編輯景點美饌' : '新增景點美饌'}</h3>

            <form onSubmit={handleSaveGuide} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">標題名稱</label>
                <input
                  type="text"
                  value={guideForm.title}
                  onChange={(e) => setGuideForm({ ...guideForm, title: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  placeholder="例如：艾菲爾鐵塔"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">分類</label>
                  <select
                    value={guideForm.category}
                    onChange={(e) => setGuideForm({ ...guideForm, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  >
                    <option value="景點導覽">景點導覽</option>
                    <option value="美食推薦">美食推薦</option>
                    <option value="遊程活動">遊程活動</option>
                    <option value="購物指南">購物指南</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">地點名稱 (導航用)</label>
                  <input
                    type="text"
                    value={guideForm.location}
                    onChange={(e) => setGuideForm({ ...guideForm, location: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    placeholder="地址或地標名稱"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">主圖上傳或圖片網址</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleFileUpload(e, (newFiles) => {
                        if (newFiles.length > 0) {
                          setGuideForm(prev => ({ ...prev, imageUrl: newFiles[0].url }));
                        }
                      });
                    }}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={guideForm.imageUrl}
                    onChange={(e) => setGuideForm({ ...guideForm, imageUrl: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 outline-none"
                    placeholder="或直接貼上圖片 URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">背景介紹</label>
                <textarea
                  rows="2"
                  value={guideForm.background}
                  onChange={(e) => setGuideForm({ ...guideForm, background: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  placeholder="輸入景點歷史、由來或餐廳風格..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">特色亮點 (可條列)</label>
                <textarea
                  rows="3"
                  value={guideForm.features}
                  onChange={(e) => setGuideForm({ ...guideForm, features: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  placeholder="• 招牌必點菜色&#10;• 最佳拍照位置"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">攻略與注意事項</label>
                <textarea
                  rows="2"
                  value={guideForm.notes}
                  onChange={(e) => setGuideForm({ ...guideForm, notes: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  placeholder="輸入門票預約、排隊建議或營業時間..."
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGuideModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 記帳編輯/新增 彈窗 */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl relative">
            <button onClick={() => setIsExpenseModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-4">{editingExpense ? '編輯公款紀錄' : '新增公款記帳'}</h3>

            <form onSubmit={handleSaveExpense} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">日期</label>
                  <input
                    type="text"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">類別</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none cursor-pointer"
                  >
                    <option value="餐飲">餐飲</option>
                    <option value="交通">交通</option>
                    <option value="門票">門票</option>
                    <option value="住宿">住宿</option>
                    <option value="購物">購物</option>
                    <option value="雜項">雜項</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">款項說明</label>
                <input
                  type="text"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                  placeholder="例如：晚餐餐廳費用"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">金額 (€ 歐元)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={expenseForm.amountEur}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amountEur: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">付款/代墊者</label>
                  <select
                    value={expenseForm.paidBy}
                    onChange={(e) => setExpenseForm({ ...expenseForm, paidBy: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none cursor-pointer"
                  >
                    <option value="爸爸">爸爸</option>
                    <option value="媽媽">媽媽</option>
                    <option value="阿韜">阿韜</option>
                    <option value="阿暘">阿暘</option>
                    <option value="洳亦">洳亦</option>
                    <option value="公款">公款</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">備註</label>
                <input
                  type="text"
                  value={expenseForm.notes}
                  onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
                >
                  儲存記帳
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 照片放大預覽 Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-2xl max-h-[90vh]">
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[85vh] rounded-lg object-contain" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}