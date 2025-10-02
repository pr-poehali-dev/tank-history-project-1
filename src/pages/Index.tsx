import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeSection, setActiveSection] = useState("main");

  const tankModels = [
    {
      name: "Т-34",
      year: "1940",
      image: "https://v3.fal.media/files/lion/eWeZFMoRrWaJ_ZuZZksNO_output.png",
      specs: { weight: "26.5 т", crew: "4", speed: "55 км/ч" }
    },
    {
      name: "КВ-1",
      year: "1939",
      image: "https://v3.fal.media/files/lion/eWeZFMoRrWaJ_ZuZZksNO_output.png",
      specs: { weight: "47.5 т", crew: "5", speed: "35 км/ч" }
    },
    {
      name: "ИС-2",
      year: "1943",
      image: "https://v3.fal.media/files/lion/eWeZFMoRrWaJ_ZuZZksNO_output.png",
      specs: { weight: "46 т", crew: "4", speed: "37 км/ч" }
    }
  ];

  const designers = [
    { name: "Михаил Кошкин", role: "Конструктор Т-34", years: "1898-1940" },
    { name: "Жозеф Котин", role: "Тяжёлые танки КВ, ИС", years: "1908-1979" },
    { name: "Александр Морозов", role: "Средние танки", years: "1904-1979" }
  ];

  const blueprints = [
    { title: "Чертёж Т-34", type: "Общий вид", year: "1940" },
    { title: "Компоновка КВ-1", type: "Схема узлов", year: "1939" },
    { title: "Башня ИС-2", type: "Деталировка", year: "1943" }
  ];

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
                onClick={() => setActiveSection("main")}
                className="text-sm hover:text-accent transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection("history")}
                className="text-sm hover:text-accent transition-colors"
              >
                История
              </button>
              <button 
                onClick={() => setActiveSection("models")}
                className="text-sm hover:text-accent transition-colors"
              >
                Модели
              </button>
              <button 
                onClick={() => setActiveSection("designers")}
                className="text-sm hover:text-accent transition-colors"
              >
                Конструкторы
              </button>
              <button 
                onClick={() => setActiveSection("blueprints")}
                className="text-sm hover:text-accent transition-colors"
              >
                Чертежи
              </button>
            </nav>
            <Button size="sm" variant="outline">
              <Icon name="Search" size={18} />
            </Button>
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
                  Исследуйте инженерные решения, чертежи и технические характеристики легендарных образцов бронетехники
                </p>
                <div className="flex gap-4">
                  <Button onClick={() => setActiveSection("models")}>
                    Каталог моделей
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                  <Button variant="outline" onClick={() => setActiveSection("blueprints")}>
                    <Icon name="FileText" size={18} className="mr-2" />
                    Чертежи
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/5 rounded-lg"></div>
                <img 
                  src="https://v3.fal.media/files/lion/eWeZFMoRrWaJ_ZuZZksNO_output.png" 
                  alt="Technical blueprint" 
                  className="relative z-10 w-full rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 bg-card border border-border p-3 rounded font-mono text-sm">
                  <div className="text-muted-foreground text-xs">Т-34 СРЕДНИЙ ТАНК</div>
                  <div className="font-bold">Год: 1940</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === "history" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8">История развития</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { period: "1920-1930", title: "Первые образцы", desc: "Создание лёгких и средних танков" },
              { period: "1940-1945", title: "Великая Отечественная", desc: "Т-34, КВ, ИС — легендарные машины войны" },
              { period: "1945-1991", title: "Холодная война", desc: "Т-54/55, Т-72 — массовое производство" }
            ].map((era, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-accent font-mono text-sm mb-2">{era.period}</div>
                  <h3 className="text-xl font-bold mb-2">{era.title}</h3>
                  <p className="text-muted-foreground">{era.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === "models" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8">Каталог моделей</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tankModels.map((tank, i) => (
              <Card key={i} className="overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img 
                    src={tank.image} 
                    alt={tank.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{tank.name}</h3>
                      <p className="text-muted-foreground font-mono text-sm">{tank.year}</p>
                    </div>
                    <Icon name="FileText" className="text-accent" size={20} />
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Масса:</span>
                      <span>{tank.specs.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Экипаж:</span>
                      <span>{tank.specs.crew}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Скорость:</span>
                      <span>{tank.specs.speed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === "designers" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8">Конструкторы</h2>
          <div className="space-y-4">
            {designers.map((designer, i) => (
              <Card key={i} className="hover:border-accent transition-colors">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{designer.name}</h3>
                      <p className="text-muted-foreground">{designer.role}</p>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">
                    {designer.years}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === "blueprints" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8">Технические чертежи</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Все чертежи</TabsTrigger>
              <TabsTrigger value="schemes">Схемы</TabsTrigger>
              <TabsTrigger value="details">Детали</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blueprints.map((bp, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="aspect-video bg-muted border-b border-border relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="FileText" size={48} className="text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">{bp.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{bp.type}</span>
                        <span className="text-xs font-mono text-muted-foreground">{bp.year}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="schemes">
              <p className="text-muted-foreground">Технические схемы загружаются...</p>
            </TabsContent>
            <TabsContent value="details">
              <p className="text-muted-foreground">Деталировочные чертежи загружаются...</p>
            </TabsContent>
          </Tabs>
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
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                О проекте
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Контакты
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
