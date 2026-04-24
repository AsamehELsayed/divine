import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowUp, ArrowDown, Eye, EyeOff, Save } from "lucide-react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Dashboard",
        href: "/admin/dashboard",
    },
];

export default function Dashboard({ config }: { config: any }) {
    const { data, setData, post, processing } = useForm({
        config: config || { theme: { primaryColor: '#D4AF37', accentColor: '#E5C185', backgroundColor: '#000000', textColor: '#FFFFFF' }, sections: [] }
    });

    const handleSave = () => {
        post(route('admin.config.update'), {
            onSuccess: () => toast.success("Configuration saved successfully!"),
            onError: () => toast.error("Failed to save configuration."),
        });
    };

    const updateTheme = (key: string, value: string) => {
        setData('config', {
            ...data.config,
            theme: { ...data.config.theme, [key]: value }
        });
    };

    const updateSectionVisibility = (index: number, visible: boolean) => {
        const newSections = [...data.config.sections];
        newSections[index].visible = visible;
        setData('config', { ...data.config, sections: newSections });
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...data.config.sections];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newSections.length) return;
        
        [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
        setData('config', { ...data.config, sections: newSections });
    };

    const updateSectionContent = (index: number, contentKey: string, value: any) => {
        const newSections = [...data.config.sections];
        newSections[index].content = { ...newSections[index].content, [contentKey]: value };
        setData('config', { ...data.config, sections: newSections });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage Dashboard" />
            
            <div className="flex flex-col gap-8 p-6 max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Homepage Dashboard</h1>
                        <p className="text-muted-foreground text-sm">Customize your luxury homepage experience without coding.</p>
                    </div>
                    <Button onClick={handleSave} disabled={processing} size="lg" className="shadow-lg">
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? "Saving..." : "Save Changes"}
                    </Button>
                </div>

                <Tabs defaultValue="sections" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                        <TabsTrigger value="sections">Sections & Content</TabsTrigger>
                        <TabsTrigger value="theme">Theme & Design</TabsTrigger>
                    </TabsList>

                    <TabsContent value="theme" className="space-y-6">
                        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Color Palette</CardTitle>
                                <CardDescription>Define the core colors that represent your brand.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                <div className="space-y-3">
                                    <Label>Primary (Gold)</Label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <Input 
                                                type="color" 
                                                className="w-12 h-10 p-1 cursor-pointer" 
                                                value={data.config.theme?.primaryColor || '#D4AF37'} 
                                                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                                            />
                                            <Input 
                                                value={data.config.theme?.primaryColor || '#D4AF37'} 
                                                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                                            />
                                        </div>
                                        <div className="h-4 rounded" style={{ backgroundColor: data.config.theme?.primaryColor }} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label>Accent (Warm Gold)</Label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <Input 
                                                type="color" 
                                                className="w-12 h-10 p-1 cursor-pointer" 
                                                value={data.config.theme?.accentColor || '#E5C185'} 
                                                onChange={(e) => updateTheme('accentColor', e.target.value)}
                                            />
                                            <Input 
                                                value={data.config.theme?.accentColor || '#E5C185'} 
                                                onChange={(e) => updateTheme('accentColor', e.target.value)}
                                            />
                                        </div>
                                        <div className="h-4 rounded" style={{ backgroundColor: data.config.theme?.accentColor }} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label>Background</Label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <Input 
                                                type="color" 
                                                className="w-12 h-10 p-1 cursor-pointer" 
                                                value={data.config.theme?.backgroundColor || '#000000'} 
                                                onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                                            />
                                            <Input 
                                                value={data.config.theme?.backgroundColor || '#000000'} 
                                                onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                                            />
                                        </div>
                                        <div className="h-4 rounded border border-gray-200" style={{ backgroundColor: data.config.theme?.backgroundColor }} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label>Text</Label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <Input 
                                                type="color" 
                                                className="w-12 h-10 p-1 cursor-pointer" 
                                                value={data.config.theme?.textColor || '#FFFFFF'} 
                                                onChange={(e) => updateTheme('textColor', e.target.value)}
                                            />
                                            <Input 
                                                value={data.config.theme?.textColor || '#FFFFFF'} 
                                                onChange={(e) => updateTheme('textColor', e.target.value)}
                                            />
                                        </div>
                                        <div className="h-4 rounded border border-gray-200" style={{ backgroundColor: data.config.theme?.textColor }} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="sections">
                        <div className="flex flex-col gap-4">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {data.config.sections?.map((section: any, index: number) => (
                                    <Card key={section.id} className={`${!section.visible ? "opacity-50" : "bg-white/50"} border-none shadow-sm transition-opacity`}>
                                        <div className="flex items-center gap-4 px-6 py-3">
                                            <div className="flex flex-col">
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSection(index, 'up')} disabled={index === 0}>
                                                    <ArrowUp className="h-3 w-3" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSection(index, 'down')} disabled={index === data.config.sections.length - 1}>
                                                    <ArrowDown className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">#{String(index).padStart(2, '0')}</span>
                                                    <h3 className="text-base font-semibold capitalize">{section.id}</h3>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted uppercase tracking-wider text-muted-foreground">{section.type}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{section.content.title?.replace(/<[^>]*>?/gm, '')}</p>
                                            </div>


                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor={`visible-${section.id}`} className="text-xs text-muted-foreground">{section.visible ? "Visible" : "Hidden"}</Label>
                                                    <Switch 
                                                        id={`visible-${section.id}`}
                                                        checked={section.visible}
                                                        onCheckedChange={(val) => updateSectionVisibility(index, val)}
                                                    />
                                                </div>
                                                {section.visible ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                                            </div>
                                        </div>
                                        
                                        <AccordionItem value={section.id} className="border-none">
                                            <AccordionTrigger className="px-6 py-2 hover:no-underline bg-muted/20 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                                Click to edit content
                                            </AccordionTrigger>
                                            <AccordionContent className="p-8 space-y-8 bg-white/30">
                                                {section.type === 'hero' && (
                                                    <div className="space-y-6">
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Top Badge</Label>
                                                            <Input value={section.content.badge} onChange={(e) => updateSectionContent(index, 'badge', e.target.value)} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Hero Title (HTML allowed)</Label>
                                                            <Input value={section.content.title} onChange={(e) => updateSectionContent(index, 'title', e.target.value)} />
                                                            <p className="text-[10px] text-muted-foreground">Example: Where Luxury &lt;em class="italic text-gold"&gt;Finds&lt;/em&gt; Its Voice</p>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
                                                            <Textarea rows={3} value={section.content.description} onChange={(e) => updateSectionContent(index, 'description', e.target.value)} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Button Label</Label>
                                                            <Input value={section.content.buttonText} onChange={(e) => updateSectionContent(index, 'buttonText', e.target.value)} />
                                                        </div>
                                                    </div>
                                                )}

                                                {section.type === 'about' && (
                                                    <div className="space-y-6">
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Section Title (HTML allowed)</Label>
                                                            <Input value={section.content.title} onChange={(e) => updateSectionContent(index, 'title', e.target.value)} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Subtitle</Label>
                                                            <Input value={section.content.subtitle} onChange={(e) => updateSectionContent(index, 'subtitle', e.target.value)} />
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Primary Body Paragraph</Label>
                                                                <Textarea rows={4} value={section.content.body1} onChange={(e) => updateSectionContent(index, 'body1', e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Secondary Body Paragraph</Label>
                                                                <Textarea rows={4} value={section.content.body2} onChange={(e) => updateSectionContent(index, 'body2', e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-muted">
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Founder Name</Label>
                                                                <Input value={section.content.founderName} onChange={(e) => updateSectionContent(index, 'founderName', e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Founder Role</Label>
                                                                <Input value={section.content.founderRole} onChange={(e) => updateSectionContent(index, 'founderRole', e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Signature Text</Label>
                                                                <Input value={section.content.founderSignature} onChange={(e) => updateSectionContent(index, 'founderSignature', e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {section.type === 'service' && (
                                                    <div className="space-y-6">
                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Division Name</Label>
                                                                <Input value={section.content.division} onChange={(e) => updateSectionContent(index, 'division', e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Accent Color</Label>
                                                                <Input type="color" className="w-full h-10 p-1" value={section.content.accentColor} onChange={(e) => updateSectionContent(index, 'accentColor', e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Title</Label>
                                                            <Input value={section.content.title} onChange={(e) => updateSectionContent(index, 'title', e.target.value)} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Focus Statement</Label>
                                                            <Input value={section.content.focus} onChange={(e) => updateSectionContent(index, 'focus', e.target.value)} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Body Content</Label>
                                                            <Textarea rows={3} value={section.content.body} onChange={(e) => updateSectionContent(index, 'body', e.target.value)} />
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-8">
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Layout Style</Label>
                                                                <select 
                                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={section.content.layout}
                                                                    onChange={(e) => updateSectionContent(index, 'layout', e.target.value)}
                                                                >
                                                                    <option value="split">Split (Luxury Editorial)</option>
                                                                    <option value="center-grid">Center Grid (Modern)</option>
                                                                    <option value="heroic">Heroic (Bold Visual)</option>
                                                                </select>
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Alignment (for Split layout)</Label>
                                                                <div className="flex gap-4">
                                                                    <Button 
                                                                        type="button"
                                                                        variant={section.content.align === 'left' ? 'default' : 'outline'} 
                                                                        className="flex-1 text-xs"
                                                                        onClick={() => updateSectionContent(index, 'align', 'left')}
                                                                    >
                                                                        Left
                                                                    </Button>
                                                                    <Button 
                                                                        type="button"
                                                                        variant={section.content.align === 'right' ? 'default' : 'outline'} 
                                                                        className="flex-1 text-xs"
                                                                        onClick={() => updateSectionContent(index, 'align', 'right')}
                                                                    >
                                                                        Right
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Services List (One per line)</Label>
                                                            <Textarea 
                                                                rows={5}
                                                                value={section.content.services?.join('\n')} 
                                                                onChange={(e) => updateSectionContent(index, 'services', e.target.value.split('\n'))} 
                                                            />
                                                        </div>
                                                        {section.content.sectors && (
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Sectors Supported (Comma separated)</Label>
                                                                <Input 
                                                                    value={section.content.sectors?.join(', ')} 
                                                                    onChange={(e) => updateSectionContent(index, 'sectors', e.target.value.split(',').map((s: string) => s.trim()))} 
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {section.type === 'contact' && (
                                                    <div className="space-y-6">
                                                        <div className="grid gap-2">
                                                            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Main Heading (HTML allowed)</Label>
                                                            <Input value={section.content.title} onChange={(e) => updateSectionContent(index, 'title', e.target.value)} />
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                                                <Input value={section.content.email} onChange={(e) => updateSectionContent(index, 'email', e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                                                                <Input value={section.content.phone} onChange={(e) => updateSectionContent(index, 'phone', e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Instagram Handle</Label>
                                                                <Input value={section.content.instagram} onChange={(e) => updateSectionContent(index, 'instagram', e.target.value)} />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Instagram URL</Label>
                                                                <Input value={section.content.instagramUrl} onChange={(e) => updateSectionContent(index, 'instagramUrl', e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Card>
                                ))}
                            </Accordion>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="sticky bottom-6 flex justify-end">
                    <Button onClick={handleSave} disabled={processing} size="lg" className="shadow-2xl h-14 px-8 text-base">
                        <Save className="mr-2 h-5 w-5" />
                        {processing ? "Saving..." : "Save Configuration"}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
