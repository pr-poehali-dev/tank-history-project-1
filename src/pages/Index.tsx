import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tanks } from "@/data/tanks";
import { designers } from "@/data/designers";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("main");

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) setActiveSection(section);
  }, [searchParams]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate(`/?section=${section}`, { replace: true });
  };

  const sovietTanks = tanks.filter(t => t.country === "СССР" || t.country === "Россия");
  const westernTanks = tanks.filter(t => t.country !== "СССР" && t.country !== "Россия");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Shield" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">ТАНКОТРИЛИЯ</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => handleSectionChange("main")}
                className={`text-sm transition-colors ${activeSection === "main" ? "text-accent font-bold" : "hover:text-accent"}`}
              >
                Главная
              </button>
              <button 
                onClick={() => handleSectionChange("history")}
                className={`text-sm transition-colors ${activeSection === "history" ? "text-accent font-bold" : "hover:text-accent"}`}
              >
                История
              </button>
              <button 
                onClick={() => handleSectionChange("models")}
                className={`text-sm transition-colors ${activeSection === "models" ? "text-accent font-bold" : "hover:text-accent"}`}
              >
                Модели
              </button>
              <button 
                onClick={() => handleSectionChange("designers")}
                className={`text-sm transition-colors ${activeSection === "designers" ? "text-accent font-bold" : "hover:text-accent"}`}
              >
                Конструкторы
              </button>
              <button 
                onClick={() => navigate("/compare")}
                className="text-sm hover:text-accent transition-colors"
              >
                Сравнение
              </button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline">
                  <Icon name="Menu" size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Содержание портала</SheetTitle>
                  <SheetDescription>Навигация по разделам</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { handleSectionChange("main"); }}
                  >
                    <Icon name="Home" size={18} className="mr-2" />
                    Главная
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { handleSectionChange("history"); }}
                  >
                    <Icon name="Clock" size={18} className="mr-2" />
                    История развития
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { handleSectionChange("models"); }}
                  >
                    <Icon name="Grid" size={18} className="mr-2" />
                    Каталог моделей
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { handleSectionChange("designers"); }}
                  >
                    <Icon name="Users" size={18} className="mr-2" />
                    Конструкторы
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => navigate("/compare")}
                  >
                    <Icon name="GitCompare" size={18} className="mr-2" />
                    Сравнение танков
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === "main" && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono mb-4 rounded">
                  ТЕХНИЧЕСКАЯ ДОКУМЕНТАЦИЯ
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  История<br/>танкостроения<br/>России
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                  Исследуйте инженерные решения и технические характеристики легендарных образцов бронетехники от Т-34 до Т-14 Армата
                </p>
                <div className="flex gap-4">
                  <Button onClick={() => handleSectionChange("models")}>
                    Каталог моделей
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/compare")}>
                    <Icon name="GitCompare" size={18} className="mr-2" />
                    Сравнение
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/5 rounded-lg"></div>
                <img 
                  src={tanks[0].image} 
                  alt="Technical blueprint" 
                  className="relative z-10 w-full rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 bg-card border border-border p-3 rounded font-mono text-sm">
                  <div className="text-muted-foreground text-xs">{tanks[0].name}</div>
                  <div className="font-bold">Год: {tanks[0].year}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === "history" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8">История развития танкостроения</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                period: "1920-1940", 
                title: "Становление", 
                desc: "МС-1, Т-26, БТ, Т-34 — создание советской школы танкостроения. Первые опыты, заимствование западных технологий и переход к собственным разработкам." 
              },
              { 
                period: "1940-1945", 
                title: "Великая Отечественная", 
                desc: "Т-34, КВ, ИС — легендарные машины войны. Массовое производство, эвакуация заводов на Урал, создание лучших танков Второй мировой войны." 
              },
              { 
                period: "1945-1970", 
                title: "Холодная война", 
                desc: "Т-54/55, Т-62 — массовое производство и экспорт. Создание самого массового танка в истории, широкое распространение советской бронетехники по всему миру." 
              },
              { 
                period: "1970-1991", 
                title: "Новое поколение", 
                desc: "Т-64, Т-72, Т-80 — революция в танкостроении. Композитная броня, автомат заряжания, газотурбинные двигатели, управляемое вооружение." 
              },
              { 
                period: "1991-2010", 
                title: "Постсоветский период", 
                desc: "Т-90 и модернизации — сохранение технологий. Глубокая модернизация существующих танков, экспорт, создание Т-90 как развитие Т-72." 
              },
              { 
                period: "2010-наст.вр.", 
                title: "Современность", 
                desc: "Т-14 Армата — танк будущего. Необитаемая башня, активная защита, универсальная платформа, цифровизация боевых систем." 
              }
            ].map((era, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-accent font-mono text-sm mb-2">{era.period}</div>
                  <h3 className="text-xl font-bold mb-2">{era.title}</h3>
                  <p className="text-muted-foreground text-sm">{era.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === "models" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8">Каталог моделей</h2>
          
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Flag" className="text-accent" size={24} />
              Советские и российские танки
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sovietTanks.map((tank) => (
                <Card 
                  key={tank.id} 
                  className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => navigate(`/tank/${tank.id}`)}
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img 
                      src={tank.image} 
                      alt={tank.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{tank.name}</h3>
                        <p className="text-muted-foreground font-mono text-xs">{tank.year}</p>
                      </div>
                      <Icon name="ArrowRight" className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{tank.type}</p>
                    <div className="flex gap-1 text-xs font-mono">
                      <span className="px-2 py-1 bg-muted rounded">{tank.specs.weight}</span>
                      <span className="px-2 py-1 bg-muted rounded">{tank.specs.speed}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Globe" className="text-accent" size={24} />
              Западные танки
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {westernTanks.map((tank) => (
                <Card 
                  key={tank.id} 
                  className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => navigate(`/tank/${tank.id}`)}
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img 
                      src={tank.image} 
                      alt={tank.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{tank.name}</h3>
                        <p className="text-muted-foreground font-mono text-xs">{tank.country}, {tank.year}</p>
                      </div>
                      <Icon name="ArrowRight" className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{tank.type}</p>
                    <div className="flex gap-1 text-xs font-mono">
                      <span className="px-2 py-1 bg-muted rounded">{tank.specs.weight}</span>
                      <span className="px-2 py-1 bg-muted rounded">{tank.specs.speed}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "designers" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8">Конструкторы танков</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {designers.map((designer) => (
              <Card 
                key={designer.id} 
                className="hover:border-accent transition-colors cursor-pointer group"
                onClick={() => navigate(`/designer/${designer.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={32} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                        {designer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{designer.role}</p>
                      <p className="text-xs font-mono text-muted-foreground mb-3">{designer.years}</p>
                      <div className="flex flex-wrap gap-1">
                        {designer.tanks.slice(0, 4).map((tank, i) => (
                          <span key={i} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                            {tank}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Icon name="ArrowRight" className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="text-muted-foreground" size={20} />
              <span className="text-sm text-muted-foreground font-mono">ТАНКОТРИЛИЯ © 2025</span>
            </div>
            <div className="flex gap-6">
              <button 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => handleSectionChange("history")}
              >
                История
              </button>
              <button 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate("/compare")}
              >
                Сравнение
              </button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default Index;
